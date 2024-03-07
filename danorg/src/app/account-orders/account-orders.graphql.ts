import {gql} from 'apollo-angular';


export const GET_ORDERS = gql`
    query GetCustomerOrderList($options: OrderListOptions) {
        activeCustomer {
		    __typename
            id
            orders(options: $options) {
			    __typename
                items {
				    __typename
                    id
                    updatedAt
                    code
                    state
                    currencyCode
                    total
                    totalWithTax
                }
                totalItems
            }
        }
    }
`;
