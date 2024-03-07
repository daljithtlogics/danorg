import { Component, OnInit, OnDestroy  } from '@angular/core';
import { gql, Apollo } from "apollo-angular";
import { CartItem } from '../models/CartItem';
import { CartService } from '../CartService';
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';

import { AddItemToOrderMutation, AddItemToOrderMutationVariables, Order, ErrorResult, InsufficientStockError, removeOrderLineMutation, removeOrderLineMutationVariables, OrderModificationError, NegativeQuantityError, OrderLimitError, adjustOrderLineMutation, adjustOrderLineMutationVariables,  CouponCodeExpiredError, CouponCodeInvalidError, CouponCodeLimitError, applyCouponCodeMutation, applyCouponCodeMutationVariables, removeCouponCodeMutation, removeCouponCodeMutationVariables } from '../types';

import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


const GET_ACTIVE_ORDER_QUERY = gql`
	query {
	  activeOrder {
		id
		code
		state
		active
		updatedAt
		orderPlacedAt
		lines {
		  id
		  featuredAsset {
			id
			width
			height
			name
			preview
			focalPoint {
			  x
			  y
			}
		  }
		  unitPrice
		  unitPriceWithTax
		  quantity
		  linePriceWithTax
		  discountedLinePriceWithTax
		  productVariant {
			id
			name
			sku
			product{
				name
				slug
			}
		  }
		  discounts {
			amount
			amountWithTax
			description
			adjustmentSource
			type
		  }
		}
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		total
		totalWithTax
		shipping
		shippingWithTax
		shippingLines {
		  priceWithTax
		  shippingMethod {
			id
			code
			name
			description
		  }
		}
		discounts {
		  amount
		  amountWithTax
		  description
		  adjustmentSource
		  type
		}
		promotions{
			id
			couponCode
			name
			perCustomerUsageLimit
		}
	  }
	}
`;	

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, OnDestroy{
	cart: CartItem[] = [];
	activeOrder: Order | undefined;	
	private querySubscription: Subscription | undefined;
	
	constructor(
		private cartService: CartService, 
		private toastrService: ToastrService, 
		private apollo: Apollo,
		private route: ActivatedRoute
	) {}
  
	ngOnInit() {

		// add a SweetAlert2 popup to show retry message after payment is declined
		// the flag is in the `netcash.controller.ts` under the 'payment-declined' post
		this.route.queryParams.subscribe(params => {
      if (params['payment'] === 'declined') {
        Swal.fire({
          icon: 'error',
          title: 'Payment Declined',
          text: 'Your payment was declined or failed. Please try again.',
          confirmButtonText: 'Retry Payment'
        });
      }
    });

		// cart service
		this.cartService.activeOrder$.subscribe((activeOrder: Order | undefined) => {
			this.activeOrder = activeOrder;
		});
		
		// Subscribe to cart changes to update the activeOrder when an item is added to the cart
		this.cartService.getActiveOrder().subscribe(
			(order: Order | undefined) => {
				// Handle the order data
				this.activeOrder = order
				console.log('cart', order);				
			},
			(error: any) => {
				// Handle the error
				console.error('API Error:', error);
			},
			() => {
				// Handle the case when no active order is found
				//console.log('No active order found.');
			}
		);	
		
		this.querySubscription = this.apollo.watchQuery<any>({
			query: GET_ACTIVE_ORDER_QUERY,
		}).valueChanges.subscribe(({ data, loading }: { data: any, loading: boolean }) => {
			console.log(loading);
			this.activeOrder = data.activeOrder;
			console.log('query active:', this.activeOrder);
		},
		(error) => {
			console.error('Error fetching active order:', error);
		});
	}

	ngOnDestroy() {
		// Unsubscribe from the query subscription when the component is destroyed
		if (this.querySubscription) { this.querySubscription.unsubscribe(); }
	}
	
	onRemoveCart(id: number){	
		const productId = id;
		this.cartService.removeOrderLine(productId).subscribe(
			(response: removeOrderLineMutation['removeOrderLine']) => {          
			  if ('id' in response && response.id) {
				const removeOrderLine = response as Order;
				if (id) {
					console.log(removeOrderLine, removeOrderLine.id + ' Success');
					this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
						// Update the activeOrderSubject in the CartService
						this.cartService.updateActiveOrder(activeOrder);
					});
					this.toastrService.success('Product removed from the cart.', 'Success!');				
				}
			  } else {
			  
					const errorResponse = response as OrderModificationError;
					this.toastrService.error(errorResponse.message, 'Error!');
					  
			  } 
			},
			error => {
			  // Handle the API call error
			  console.error('API Error:', error);
			}
		);
	}
	
	adjustItemQuantity(id: number, qty: number){
		const orderLineId = id;
	    const quantity = qty;
		this.cartService.adjustOrderLine(orderLineId, quantity).subscribe(
			(response: adjustOrderLineMutation['adjustOrderLine']) => {
				switch (response.__typename) {
					case 'Order':
					    const adjustOrderLine = response as Order;
						console.log('adjustOrderLine', response);
					    this.toastrService.success('Cart Updated!', 'Success!');
						this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
							// Update the activeOrderSubject in the CartService
							this.cartService.updateActiveOrder(activeOrder);
						});
						break;
					case 'InsufficientStockError':
					case 'NegativeQuantityError':
					case 'OrderLimitError':
					case 'OrderModificationError':
					    const errorResponse = response as InsufficientStockError | NegativeQuantityError | OrderLimitError | OrderModificationError;
						this.toastrService.error(errorResponse.message, 'Error!');
						console.log(response);
						break;
				}
			}
		);
	}
	
	decrement(id:number, qty:number){
		let quantity: number = qty - 1;
		if (0 < quantity) {
			this.adjustItemQuantity(id, quantity);
		}else{
			this.onRemoveCart(id);
		}
	}
	
	increment(id:number, qty:number){
		let quantity: number = qty + 1;
		this.adjustItemQuantity(id, quantity);
	}
	
	successMessage: string = '';
	errorMessage: string = '';
	
	hideMessage() {
	  this.successMessage = ''; // Clear the success message
	  this.errorMessage = ''; // Clear the success message
	}
	
	applyCoupon(coupon: string){
		const couponCode = coupon;
		this.cartService.applyCouponCode(couponCode).subscribe(
			(response: applyCouponCodeMutation['applyCouponCode']) => {
				if(response.__typename == 'Order'){
					this.toastrService.success('Coupon applied!', 'Success!');
					this.successMessage = 'Coupon applied successfully!';
					setTimeout(() => {
						this.hideMessage();
					}, 5000);
					this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
						// Update the activeOrderSubject in the CartService
						this.cartService.updateActiveOrder(activeOrder);
					});
				}else{
					const errorResponse = response as CouponCodeExpiredError | CouponCodeInvalidError | CouponCodeLimitError;
					this.toastrService.error(errorResponse.message, 'Error!');
					this.errorMessage = errorResponse.message;
					setTimeout(() => {
						this.hideMessage();
					}, 5000);
					console.log(response);
				}
				/*switch (response.__typename) {
					case 'Order':
					    						
					case 'CouponCodeExpiredError':
					case 'CouponCodeInvalidError':
					case 'CouponCodeLimitError':
					    
				}*/
			}
		);
	}
	
	couponCode: string = '';
	submitCoupon(){
		this.applyCoupon(this.couponCode);
	}
	
	removeCouponCode(coupon: string){
		const couponCode = coupon;
		this.cartService.removeCouponCode(couponCode).subscribe(
			(response: removeCouponCodeMutation['removeCouponCode']) => {
				switch (response.__typename) {
					case 'Order':
					    //this.toastrService.success('Coupon applied!', 'Success!');
						this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
							// Update the activeOrderSubject in the CartService
							this.cartService.updateActiveOrder(activeOrder);
						});
					break;	
				}
			}
		);
	}

}