import {gql} from 'apollo-angular';

export const GET_ORDER_FOR_CHECKOUT = gql`
    query {
	  activeOrder {
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