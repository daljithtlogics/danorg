import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mapTo, scan, share, shareReplay, skip, switchMap, take, tap, } from 'rxjs/operators';
import { Category, Collection } from '../models/category';
import { CommonModule } from "@angular/common";
import { DecimalPipe } from '@angular/common';
import { CartService } from '../CartService';
import { CartItem } from '../models/CartItem';
import { ToastrService } from 'ngx-toastr';
import {gql, Apollo} from 'apollo-angular';

import { FormsModule } from '@angular/forms';
import { StateService } from '../state.service';

import { Order, ErrorResult, InsufficientStockError, AddItemToOrderMutation } from '../types';

const Get_Products = gql`
	query GetProducts($collectionId: ID!){
	  search(input: { collectionId: $collectionId, groupByProduct: true, take:100 }) {
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

const Get_Collection = gql`
	query GetCollection($collectionSlug: String!){
		collection(slug: $collectionSlug) {
            id
            name
            slug
            description
			featuredAsset{
              source
            }
            breadcrumbs {
                id
                slug
                name
            }
        }
	}
`;

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
	allProducts:Category[] = [];
	collectionData: Collection | null = null;
	collectionId: string | null = null;
	
	product: { id: number; name: string; price: number } = {
		id: 1,
		name: 'Product 1',
		price: 10
	};

	constructor(private apollo: Apollo,private cartService: CartService,private toastrService: ToastrService,private decimalPipe: DecimalPipe, private route: ActivatedRoute, private router: Router,private stateService: StateService,){}
  
	ngOnInit(): void {
	        
			//collection
			this.route.paramMap.pipe(
				switchMap(params => {
					const collectionSlug = params.get('slug');
					console.log(collectionSlug);
					return this.apollo.watchQuery<any>({
						query: Get_Collection,
						variables: { collectionSlug }
					}).valueChanges;
				})
			).subscribe(({ data, loading }) => {
				console.log(loading);
				this.collectionId = data.collection.id;
				this.collectionData = data.collection;
                console.log(this.collectionData);
				// Call the second query using the collectionId
				this.apollo.watchQuery<any>({
					query: Get_Products,
					variables: { collectionId: this.collectionId }
				}).valueChanges.subscribe(({ data, loading }) => {
					console.log(loading);
					this.allProducts = data.search.items;
					console.log(this.allProducts);
				});
			});
	}
	


	/*
	onAddToCart(event:any): void {
		console.log('working cart');
		const productId = Number((event.target as Element).getAttribute('data-productId'));
		const productPrice = Number((event.target as Element).getAttribute('data-productPrice'));
		const productName = String((event.target as Element).getAttribute('data-productName'));
		const cartItem: CartItem = {
			id: productId,
			name: productName,
			price: productPrice,
			quantity: 1
		};
		this.cartService.addToCart(cartItem);
	}

	myFunction(event: MouseEvent) {
		const productId = Number((event.target as Element).getAttribute('data-productId'));
		const productPrice = Number((event.target as Element).getAttribute('data-productPrice'));
		const productName = String((event.target as Element).getAttribute('data-productName'));
		const cartItem: CartItem = {
			id: productId,
			name: productName,
			price: productPrice,
			quantity: 1
		};
		this.cartService.addToCart(cartItem);
		this.toastrService.success('Product Added to Cart', 'Success!');

	}*/
	
	navigateToRoute(productslug: string) {
	    //const productslug = String((event.target as Element).getAttribute('data-productslug'));
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