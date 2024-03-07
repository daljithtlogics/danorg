import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DecimalPipe } from '@angular/common';
import {gql, Apollo} from 'apollo-angular';
import { Product, Category } from '../models/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../CartService';
import { CartItem } from '../models/CartItem';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../state.service';

import { Order, ErrorResult, InsufficientStockError, AddItemToOrderMutation } from '../types';

const Get_Products = gql`
	query GetProducts{
	  search(input: { groupByProduct: true }) {
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
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
 
export class ProductsComponent implements OnInit {
	allProducts:Category[] = [];	
	//cart: CartItem[] = []; 
	customOptions: OwlOptions = {    
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1,
			},
			400: {
				items: 2,
			},
			740: {
				items: 3,
			},
			940: {
				items: 5,
			}
		},
		nav: true
	}
	
	constructor(private apollo: Apollo,private cartService: CartService,private toastrService: ToastrService,private decimalPipe: DecimalPipe,  private route: ActivatedRoute, private router: Router,private stateService: StateService,){}
	
	ngOnInit(): void {
		this.apollo.watchQuery<any>({
			query: Get_Products
		})
		.valueChanges.subscribe(({data, loading}) => {
			this.allProducts = data.search.items.slice(0, 4);
			console.log(this.allProducts);
		})
	}
	
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
