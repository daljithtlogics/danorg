import {gql} from 'apollo-angular';

export const ORDER_BY_CODE = gql`
	query OrderByCode($code: String!) {
		orderByCode(code:$code) {
			id
			createdAt
			updatedAt
			id
			code
			state
			active
			updatedAt
			orderPlacedAt
			currencyCode
			customer{
				firstName
				lastName
				phoneNumber
				emailAddress
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
`;