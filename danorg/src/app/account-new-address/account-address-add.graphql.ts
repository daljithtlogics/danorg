import {gql} from 'apollo-angular';

export const CREATE_ADDRESS = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
        createCustomerAddress(input: $input) {
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
`;
