export interface NetcashNotification {
    p2: string;     // Unique transaction ID
    p4: number;     // Transaction amount in ZAR
    Reason: string; // transaction state (called Reason in Netcash)
}