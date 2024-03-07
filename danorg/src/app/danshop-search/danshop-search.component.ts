import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from "@angular/common";
import {gql, Apollo} from 'apollo-angular';
import { Product, Category } from '../models/product';
import { CartService } from '../CartService';
import { CartItem } from '../models/CartItem';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mapTo, scan, share, shareReplay, skip, switchMap, take, tap, } from 'rxjs/operators';

import { StateService } from '../state.service';
import { Order, ErrorResult, InsufficientStockError, AddItemToOrderMutation } from '../types';

const Get_Search_Product = gql`
	query GetProducts($term: String!){
	  search(input: { groupByProduct: true, take: 100, term: $term }) {
		items {
			productId
			slug
			productName
			description
			inStock
			currencyCode
			productVariantId
			productVariantName
			price {
				... on PriceRange {
					min
					max
					__typename
				}
				__typename
				... on SinglePrice {
					value
					__typename
				}
			}
			  priceWithTax {
				... on PriceRange {
					min
					max
					__typename
				}
				__typename
					... on SinglePrice {
					value
				  __typename
				}	
			  }
			productAsset {
				id
				preview
				focalPoint {
					x
					y
					__typename
				}
				__typename
			}
			__typename
		}
		totalItems
		facetValues {
			count
			facetValue {
				id
				name
				facet {
					id
					name
					__typename
				}
				__typename
			}
			__typename
		}
		__typename
	  }
	}
`;

@Component({
	selector: 'app-danshop-search',
	templateUrl: './danshop-search.component.html',
	styleUrls: ['./danshop-search.component.css']
})

export class DanshopSearchComponent implements OnInit {
    
	allProducts:Category[] = [];
	searchTerm$!: Observable<string>;
	
	constructor(private apollo: Apollo,private cartService: CartService,private toastrService: ToastrService, private route: ActivatedRoute, private router: Router,private stateService: StateService,){}

	ngOnInit(): void {
	
	    this.searchTerm$ = this.route.queryParamMap.pipe(
            map(pm => pm.get('search') || ''),
            distinctUntilChanged(),
            shareReplay(1),
        );
		
		console.log(this.searchTerm$);
		
		this.searchTerm$.subscribe(searchTermValue => {
			this.apollo.watchQuery<any>({
				query: Get_Search_Product,
				variables: { term: searchTermValue }
			})
			.valueChanges.subscribe(({data, loading}) => {
				this.allProducts = data.search.items;
				console.log(this.allProducts);
			})
			//console.log('Search Term:', searchTermValue);
		});

		
		
	}
	
	navigateToRoute(productslug: string) {
		this.router.navigate(['/danshop/product-details', productslug]);
	}
	
	removeComma(price: string): string {
	  return price.replace(',', '');
	}
	
	//addtocart
	addToCart(variant: number, qty: number) {
		const productVariantId = variant;
		const quantity = qty;
		this.cartService.addItemToOrder(productVariantId, quantity).subscribe(
			(response: AddItemToOrderMutation['addItemToOrder']) => {            
			  if ('id' in response && response.id) {
				const addItemToOrder = response as Order;
				this.stateService.setState('activeOrderId', addItemToOrder ? addItemToOrder.id : null);
				if (variant) {
					console.log(addItemToOrder, addItemToOrder.id + ' Success');
					this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
						// Update the activeOrderSubject in the CartService
						this.cartService.updateActiveOrder(activeOrder);
					});
					this.toastrService.success('Product Added to Cart', 'Success!');				
				}
			  } else {
			  
					const errorResponse = response as ErrorResult | InsufficientStockError;
					this.toastrService.error(errorResponse.message, 'Error!');
					  
			  } 
			},
			error => {
			  // Handle the API call error
			  console.error('API Error:', error);
			}
		);
	}
}
