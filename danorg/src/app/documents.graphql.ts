import {gql} from 'apollo-angular';

export const GET_AVAILABLE_COUNTRIES = gql`
    query GetAvailableCountries {
        availableCountries{
			id
			languageCode
			code
			name
			enabled    
	    }
    }
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = gql`
    query GetEligibleShippingMethods{
		eligibleShippingMethods{
			id
			code
			name
			price
			priceWithTax
			description
			metadata
		}
	}
`;

export const GET_ELIGIBLE_PAYMENT_METHODS = gql`
    query GetEligiblePaymentMethods{
		eligiblePaymentMethods{
			id
			code
			name
			description
			isEligible
			eligibilityMessage
		}
	}
`;

export const GET_CUSTOMER_ADDRESS = gql`
    query {
		activeOrder {
			id
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
		}
	}
`;

export const CUSTOMER_SIGN_IN = gql`
	mutation customerLogIn($username: String!, $password: String!, $rememberme: Boolean) {
		login(username:$username, password:$password, rememberMe:$rememberme){
			__typename
			...on CurrentUser{
				id
				identifier 
			}      
			...on InvalidCredentialsError{
				errorCode
				message
			}
			...on NotVerifiedError{
				errorCode
				message
			}
			...on NativeAuthStrategyError{
				errorCode
				message
			}
		}
	}
`;

export const GET_ACTIVE_CUSTOMER = gql`
	query{
		activeCustomer{
			__typename
				id
				createdAt
				updatedAt
				title
				firstName
				lastName
				phoneNumber
				emailAddress
			user {
				id
				createdAt
				updatedAt
				identifier
				verified
				lastLogin
			}
		}
	}
`;

export const ADD_PAYMENT_TO_ORDER = gql`
	mutation customerLogIn($input: PaymentInput!) {
		addPaymentToOrder( input: $input ){
			__typename
			...on Order{
				id
				code
				state
				payments {
					method
					amount
					state
					transactionId
					metadata
				  }
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
			}
			...on OrderPaymentStateError{
				errorCode
				message
			}
			...on IneligiblePaymentMethodError {
				errorCode
				message
			}
			...on PaymentFailedError {
				errorCode
				message
			}
			...on PaymentDeclinedError{
				errorCode
				message
			}
			...on OrderStateTransitionError{
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

export const SIGIN_OUT = gql`
	mutation {
		logout{
			success
		}
	}
`;

export const REGISTER_CUSTOMTER = gql`
	mutation registerCustomer($input: RegisterCustomerInput!){
		registerCustomerAccount(input: $input){
			__typename
			...on Success
			{
				success
			}
			...on MissingPasswordError{
				errorCode
				message
			}
			...on PasswordValidationError{
				errorCode
				message
				validationErrorMessage
			}
			...on NativeAuthStrategyError{
				errorCode
				message
			}
		}
	}
`;

export const REQUEST_RESET_PASSWORD = gql`
	mutation requestPasswordReset($emailAddress: String!){
		requestPasswordReset(emailAddress: $emailAddress){
			__typename
			...on Success{
				success
			}
			...on NativeAuthStrategyError{
				errorCode
				message
			}
		}
	}
`;

export const RESET_PASSWORD = gql`
	mutation resetPassword($token: String!, $password:String!){
		resetPassword(token: $token, password: $password){
			__typename
			...on CurrentUser{
				id
							identifier
			}
			...on PasswordResetTokenInvalidError{
				errorCode
				message
			}
				...on PasswordResetTokenExpiredError{
				errorCode
				message
			}
			...on PasswordValidationError{
				errorCode
				message
			}
			...on NativeAuthStrategyError{
				errorCode
					message
			}
			...on NotVerifiedError{
				errorCode
					message
			}
		}
	}
`;


export const ME = gql`
	query {
		me{
			__typename
			id
			identifier   
			channels{
				id
				token
				code
				permissions
			}		
		}
	}
`;

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddresses {
        activeCustomer {
            id
            addresses {
				id
				createdAt
				updatedAt
				fullName
				company
				streetLine1
				streetLine2
				city
				province
				postalCode
				country{
					id
					code
					name
					enabled
				}
				phoneNumber
				defaultShippingAddress
				defaultBillingAddress
                customFields				
            }
        }
    }
`;
