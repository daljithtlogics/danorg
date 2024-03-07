import {gql} from 'apollo-angular';

export const CHANGE_CUSTOMER_PASSWORD = gql`
    mutation updatePassword($currentPassword: String! $newPassword: String!) {
		updateCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
			__typename
			... on Success {
				__typename
				success
			}
			... on InvalidCredentialsError {
				__typename
				errorCode
				message
			}
			... on PasswordValidationError {
				__typename
				errorCode
				message
			}
			... on NativeAuthStrategyError {
				__typename
				errorCode
				message
			}  
		}
	}
`;
