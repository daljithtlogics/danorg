// Correct Netcash Notification
export interface NetcashNotification {
	Reference: string;  // Unique transaction ID (p2 in the frontend)
	Amount: number;     // Transaction amount in ZAR
	Reason: string;     // Transaction state (called Reason in Netcash)

	// Optional fields expected to receive and process
	TransactionAccepted: string; 	// “true” means the transaction was successful - boolean
	CardHolderIpAddr?: string;    	// Original IP the request was made from
	RequestTrace?: string;        	// Additional data from the 3rd Party transaction logs
	Method?: number;              	// Payment method, from 1 to 7
	// 1 Credit card
	// 2 Bank EFT
	// 3 Retail
	// 4 Instant EFT
	// 5 MasterPass
	// 6 Visa Click to Pay
	// 7 Masterpass Scan to Pay

	Extra1: string;		// extra field 1 - to return order ID back from Netcash
	Extra2: string;		// extra field 2 - to return order code back from Netcash
}