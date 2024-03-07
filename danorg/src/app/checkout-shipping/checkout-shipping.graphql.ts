import {gql} from 'apollo-angular';

export const SET_SHIPPING_ADDRESS = gql`
    mutation SetShippingAddress($input: CreateAddressInput!) {
        setOrderShippingAddress(input: $input) {
			...on Order{
				id
				code
				state
				active
				updatedAt
				orderPlacedAt
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
			... on NoActiveOrderError {
				errorCode
				message
			}
        }
    }
`;

export const SET_BILLING_ADDRESS = gql`
    mutation SetBillingAddress($input: CreateAddressInput!) {
        setOrderBillingAddress(input: $input) {
			...on Order{
				id
				code
				state
				active
				updatedAt
				orderPlacedAt
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
			... on NoActiveOrderError {
				errorCode
				message
			}
        }
    }
`;

export const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod($id: [ID!]!){
		setOrderShippingMethod(shippingMethodId: $id){
			...on Order{
					id
					code
					state
					active
					updatedAt
					orderPlacedAt
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
		  ...on OrderModificationError{
			 errorCode
			 message
		  }
		  ...on IneligibleShippingMethodError{
			 errorCode
			 message
		  }
		  ...on NoActiveOrderError{
			 errorCode
			 message
		  }
	   }
	}
`;

export const SET_CUSTOMER_FOR_ORDER = gql`
    mutation SetCustomerForOrder($input: CreateCustomerInput!){
		setCustomerForOrder(input: $input){
			...on Order{
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
		  ...on AlreadyLoggedInError{		     
			 errorCode
			 message
		  }
		  ...on EmailAddressConflictError{
			 errorCode
			 message
		  }
		  ...on NoActiveOrderError{
			 errorCode
			 message
		  }
	   }
	}
`;


export const TRANSITION_TO_ARRANGING_PAYMENT = gql`
    mutation TransitionToArrangingPayment($state: String!) {
        transitionOrderToState(state: $state) {
            ...on Order{
					id
					code
					state
					active
					updatedAt
					orderPlacedAt
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
            ...on OrderStateTransitionError{
				errorCode
				message
			}
        }
    }
`;