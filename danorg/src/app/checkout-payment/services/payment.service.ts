import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private apollo: Apollo) {}
  
  AddPaymentToOrderMutation(input: { method: string, metadata: any }) {
    // addPaymentToOrder mutation for adding a payment to the backend
    // includes the Payment field from Order entity where the metadata is
    const ADD_PAYMENT_TO_ORDER_MUTATION = gql`
    mutation AddPaymentToOrderMutation($input: PaymentInput!) {
      addPaymentToOrder( input: $input ) {
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

    // Make the HTTP POST request to the Vendure API
    return this.apollo.mutate({
      mutation: ADD_PAYMENT_TO_ORDER_MUTATION,
      variables: {
        input: { 
          method: input.method,
          metadata: input.metadata 
        }
      }
    });
  }
}