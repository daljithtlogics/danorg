import { Injectable } from '@angular/core';
import { CartItem } from './models/CartItem';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { gql, Apollo } from "apollo-angular";

import { AddItemToOrderMutation, AddItemToOrderMutationVariables, Order, ErrorResult, InsufficientStockError, removeOrderLineMutation, removeOrderLineMutationVariables, OrderModificationError, NegativeQuantityError, OrderLimitError, adjustOrderLineMutation, adjustOrderLineMutationVariables,  CouponCodeExpiredError, CouponCodeInvalidError, CouponCodeLimitError, applyCouponCodeMutation, applyCouponCodeMutationVariables, removeCouponCodeMutation, removeCouponCodeMutationVariables } from './types';
	

@Injectable({
	providedIn: 'root'
})

export class CartService {

	private activeOrderSubject: BehaviorSubject<Order | undefined> = new BehaviorSubject<Order | undefined>(undefined);
    public activeOrder$ = this.activeOrderSubject.asObservable();

	private cartKey = 'cart';
	private cart: CartItem[] = [];
	private subtotal=0;	
	private ADD_ITEM_TO_ORDER_MUTATION = gql`
		mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
			addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
				... on Order {
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
						}
						discounts {
							amount
							amountWithTax
							description
							adjustmentSource
							type
						}
					}
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
				}
				... on ErrorResult {
					errorCode
					message
				}
				... on InsufficientStockError {
					order {
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
							}
							discounts {
								amount
								amountWithTax
								description
								adjustmentSource
								type
							}
						}
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
					}
				}
			}
		}
	`;
	
	private GET_ACTIVE_ORDER_QUERY = gql`
		query {
		  activeOrder {
			id
			code
			state
			active
			updatedAt
			orderPlacedAt
			customer {
				id
				title
				firstName
				lastName
				emailAddress
				phoneNumber
			}
			shippingAddress {
				fullName
				company
				streetLine1
				streetLine2
				city
				province
				postalCode
				country
				countryCode
				phoneNumber
				customFields
			}
			billingAddress	{
				fullName
				company
				streetLine1
				streetLine2
				city
				province
				postalCode
				country
				countryCode
				phoneNumber
				customFields	
			}
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
		
    private REMOVE_ORDER_LINE_QUERY = gql`
		mutation RemoveOrderLine($orderLineId: ID!) {      
		  removeOrderLine(orderLineId: $orderLineId) {
			... on Order {
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
			... on ErrorResult {
				errorCode
				message
			}
		  }
		}
		`;
		
    private ADJUST_ORDER_LINE = gql`
		mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!){
			adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity){
				... on Order {
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
				... on OrderModificationError {
					errorCode
					message
				}
				... on OrderLimitError {
					errorCode
					message
					maxItems
				}
				... on NegativeQuantityError {
					errorCode
					message
				}
				... on InsufficientStockError {
					errorCode
					message
					quantityAvailable
				}
			}
		}
	`;
	
	
	private APPLY_COUPON_CODE = gql`
		mutation applyCouponCode($couponCode:String!){
		   applyCouponCode(couponCode: $couponCode){
			  ...on Order {
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
			  ... on CouponCodeExpiredError{
				errorCode
				message
				couponCode
			  }
			  ... on CouponCodeInvalidError{
				errorCode
				message
				couponCode
			  }
			  ... on CouponCodeLimitError{
				errorCode
				message
				couponCode
				limit
			  }
		   }
		}
	`;
	
	private REMOVE_COUPON_CODE = gql`
	mutation removeCouponCode($couponCode:String!){
	  removeCouponCode(couponCode: $couponCode){
			... on Order{
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
	}`;
	
	
	constructor(private apollo: Apollo) {
		
	}

	/*addToCart(item: CartItem): void {
		const index = this.cart.findIndex((i) => i.id === item.id);
		if (index > -1) {
		  this.cart[index].quantity += item.quantity;
		} else {
		  this.cart.push(item);
		}
		localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
	}


	quantMinus(item: CartItem): void {
		const index = this.cart.findIndex((i) => i.id === item.id);
		if (index > -1) {
			this.cart[index].quantity -= item.quantity;
		} 
		localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
	}

	getCart(): CartItem[] {
		return this.cart;
	}

	clearCart(): void {
		this.cart = [];
		localStorage.removeItem(this.cartKey);
	}
	
	clearCartSpecificId(id:any) {

		this.cart = this.cart.filter(cart => cart.id !== id);
		console.log(this.cart);
		localStorage.setItem('cart', JSON.stringify(this.cart));
	}

	getSubtotal(): number {
		let subtotal = 0;
		for (let index = 0; index < this.cart.length; index++) {
			const cartItem = this.cart[index];
			const itemSubtotal = this.cart[index].price * this.cart[index].quantity;
			subtotal += itemSubtotal;
		}
		this.subtotal = subtotal;
		return this.subtotal;
  
	} 
	
	*/
  
	//my new code	
	addItemToOrder(productVariantId: number, quantity: number): Observable<Order | ErrorResult | InsufficientStockError> {
		return 	this.apollo
				.mutate<AddItemToOrderMutation, AddItemToOrderMutationVariables>({
					mutation: this.ADD_ITEM_TO_ORDER_MUTATION,
					variables: { productVariantId, quantity }
				})
				.pipe(
					map(result => result?.data?.addItemToOrder), // Use optional chaining here
					filter(response => response !== undefined) // Filter out undefined values
				) as Observable<Order | ErrorResult | InsufficientStockError>; // Type assertion
	}
	
	/*getActiveOrder(): Observable<Order | undefined> {
	  return this.apollo.query<{ activeOrder: Order }>({
		query: this.GET_ACTIVE_ORDER_QUERY
	  }).pipe(
		map(result => result.data?.activeOrder),
		filter(order => order !== undefined) // Filter out undefined values
	  );
	}*/
	
	getActiveOrder(): Observable<Order | undefined> {
	  return this.apollo.query<{ activeOrder: Order }>({
		query: this.GET_ACTIVE_ORDER_QUERY,
		fetchPolicy: 'no-cache',
	  }).pipe(
		map(result => result.data?.activeOrder)
	  );
	}
	
	updateActiveOrder(activeOrder: Order | undefined) {		

		this.activeOrderSubject.next(activeOrder);
		console.log('Active Order Updated:', activeOrder);
		
	}

	removeOrderLine(orderLineId: number): Observable<Order | OrderModificationError> {
		return 	this.apollo
				.mutate<removeOrderLineMutation, removeOrderLineMutationVariables>({
					mutation: this.REMOVE_ORDER_LINE_QUERY,
					variables: { orderLineId }
				})
				.pipe(
					map(result => result?.data?.removeOrderLine), // Use optional chaining here
					filter(response => response !== undefined) // Filter out undefined values
				) as Observable<Order | OrderModificationError>; // Type assertion
	}
	
	adjustOrderLine(orderLineId: number, quantity: number): Observable< Order | OrderModificationError	| NegativeQuantityError | OrderLimitError | InsufficientStockError > {
		return 	this.apollo
				.mutate<adjustOrderLineMutation, adjustOrderLineMutationVariables>({
					mutation: this.ADJUST_ORDER_LINE,
					variables: { orderLineId,  quantity}
				})
				.pipe(
					map(result => result?.data?.adjustOrderLine), // Use optional chaining here
					filter(response => response !== undefined) // Filter out undefined values
				) as Observable<Order | OrderModificationError	| NegativeQuantityError | OrderLimitError | InsufficientStockError>; // Type assertion
	}
	
	applyCouponCode(couponCode: string): Observable< Order | CouponCodeExpiredError	| CouponCodeInvalidError | CouponCodeLimitError > {
		return 	this.apollo
				.mutate<applyCouponCodeMutation, applyCouponCodeMutationVariables>({
					mutation: this.APPLY_COUPON_CODE,
					variables: { couponCode }
				})
				.pipe(
					map(result => result?.data?.applyCouponCode), // Use optional chaining here
					filter(response => response !== undefined) // Filter out undefined values
				) as Observable<Order | CouponCodeExpiredError	| CouponCodeInvalidError | CouponCodeLimitError>; // Type assertion
	}
	
	removeCouponCode(couponCode: string): Observable< Order > {
		return 	this.apollo
				.mutate<removeCouponCodeMutation, removeCouponCodeMutationVariables>({
					mutation: this.REMOVE_COUPON_CODE,
					variables: { couponCode }
				})
				.pipe(
					map(result => result?.data?.removeCouponCode), // Use optional chaining here
					filter(response => response !== undefined) // Filter out undefined values
				) as Observable< Order >; // Type assertion
	}
  
}
