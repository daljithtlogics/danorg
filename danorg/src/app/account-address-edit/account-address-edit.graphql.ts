import {gql} from 'apollo-angular';

export const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
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
