import {
    PaymentMethodHandler,
    CreatePaymentResult,
    SettlePaymentResult, SettlePaymentErrorResult,
    CancelPaymentResult, CancelPaymentErrorResult,
    LanguageCode,
		Logger,
} from '@vendure/core';
import { NetcashPaymentService } from './service/netcash.service';

let netcashPaymentService: NetcashPaymentService;

/**
 * Netcash requires a POST form submission to their URL to initiate a transaction.
 * Since this is not a direct API call that returns JSON or XML data, 
 * the process is somewhat different from many other payment gateways that offer a RESTful API.
 */
export const netcashPaymentHandler = new PaymentMethodHandler({
	code: 'netcash-payment',
	description: [{
		languageCode: LanguageCode.en, value: 'Netcash Payment Gateway',
	}],
	args: {
		payNowServiceKey: {type: 'string'},
		softwareVendorKey: {type: 'string'},
	},
	init(injector) {
		netcashPaymentService = injector.get(NetcashPaymentService);
	},

	/** This is called when the `addPaymentToOrder` mutation is executed */
	createPayment: async (ctx, order, amount, args, metadata): Promise<CreatePaymentResult> => {
		// Netcash keys in .env file and verify if they exist
		const payNowServiceKey = process.env.NETCASH_PAY_NOW_SERVICE_KEY;
		const softwareVendorKey = process.env.NETCASH_SOFTWARE_VENDOR_KEY;
		if (!payNowServiceKey || !softwareVendorKey) {
			throw new Error('Netcash service key or vendor key is not defined in .env file.');
		}
		const transactionId = Math.random().toString(36).substring(3); // Unique reference for each transaction - generate random strings
		
		// Mandatory Data - according to Netcash Pay Now api
		const paymentFormData = {
			M1: payNowServiceKey,
			M2: softwareVendorKey,
			M4: order.id, // M4 - extra field 1 - used to send back order id to backend for controller
			M5: order.code, // M5 - extra field 2 - used to send back order code to backend for controller
			M9: order.customer?.emailAddress,
			M11: order.customer?.phoneNumber,
			p2: transactionId, 
			p3: order.code,
			p4: (amount/100).toFixed(2), // transaction amount in ZAR
			Budget: 'Y', 
		};

		return {
			amount,
			state: 'Authorized', // start payment process
			transactionId: transactionId,
			metadata: paymentFormData, // visible in admin ui - optional
		};
	},

	/** This is called when the `settlePayment` mutation is executed */
	settlePayment: async (ctx, order, payment, args): Promise<SettlePaymentResult | SettlePaymentErrorResult> => {
		try {
			const transactionId = payment.transactionId;

			// Retrieve the payment record in the Netcash Service
			const paymentRecord = await netcashPaymentService.getPaymentRecord(ctx, transactionId);
			//Logger.info(`Retrieved payment record: ${JSON.stringify(paymentRecord, null, 2)}`, 'NetcashPaymentHandler - Payment Record'); // uncomment if need to see payment record
			Logger.info(`Retrieved payment record successfully!`, 'NetcashPaymentHandler - Payment Record with Order');

			if (!paymentRecord) {
				Logger.warn(`Payment record not found for order with the transaction ID: ${transactionId}`, 'NetcashPaymentHandler');
				return { success: false, errorMessage: 'Payment record not found for order: ' + order.code };
			}

			// Hydrate the order entity with the required relations
			await netcashPaymentService.hydrateOrder(ctx, paymentRecord.order);

			// Map the Netcash status to the Vendure payment state
			const vendurePaymentState = payment.state;
			Logger.info(`Vendure payment state: ${vendurePaymentState}`, 'NetcashPaymentHandler');

			// Switch statement to handle different payment states and respond accordingly
			switch (vendurePaymentState) {
				case 'Authorized':
					Logger.info(`Payment for order ${order.code} settled successfully`, 'NetcashPaymentHandler');
					
					// Update the order state to reflect the payment being settled
					try {
						const orderId = order.id;
						await netcashPaymentService.transitionOrderState(ctx, orderId, 'PaymentSettled');

						// Log if successful
						Logger.info(`Order ${order.code} state updated to PaymentSettled`, 'NetcashPaymentHandler');
					} catch (orderStateError) {
						const errorMessage = orderStateError instanceof Error ? orderStateError.message : 'An unknown error occurred during updating the order state';
						const errorStack = orderStateError instanceof Error ? orderStateError.stack : 'Stack not available'
						Logger.error(`Failed to update order state for ${order.code}: ${errorMessage}`, 'NetcashPaymentHandler', errorStack);
						return { success: false, errorMessage: 'Failed to update order state' };
					}
					return { success: true };

				case 'Declined':
					Logger.warn(`Payment for order ${order.code} declined by Netcash`, 'NetcashPaymentHandler');
					return { success: false, errorMessage: 'Payment declined by Netcash' };

				case 'Cancelled':
					Logger.warn(`Payment for order ${order.code} cancelled`, 'NetcashPaymentHandler');
					return { success: false, errorMessage: 'Payment cancelled' };

				case 'Error':
					Logger.error(`Error with payment for order ${order.code}`, 'NetcashPaymentHandler');
					return { success: false, errorMessage: 'Error with payment' };

				default:
					Logger.error(`Unknown error with payment for order ${order.code}`, 'NetcashPaymentHandler');
					return { success: false, errorMessage: 'Unknown error with payment' };
			}
		} catch (error) {
			// Extracting the error message and stack trace
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during settlement';
			const errorStack = error instanceof Error ? error.stack : 'Stack trace not available';
			Logger.error(`Error during payment settlement for order ${order.code}: ${errorMessage}`, 'NetcashPaymentHandler', errorStack);
			return { success: false, errorMessage: errorMessage };
		}
	},

	/** This is called when a payment is cancelled. */
	cancelPayment: async (ctx, order, payment, args): Promise<CancelPaymentResult | CancelPaymentErrorResult> => {
		try {
			// Call the cancelPayment method from NetcashPaymentService to cancel the payment
			const cancellationResult = await netcashPaymentService.cancelPayment(ctx, payment.transactionId);

			// Based on the result, return appropriate response
			if (cancellationResult) {
				Logger.info(`Payment with Transaction ID: ${payment.transactionId} was successfully cancelled.`, 'NetcashPaymentHandler');
				return { success: true };
			} else {
				Logger.warn(`Failed to cancel payment with Transaction ID: ${payment.transactionId}.`, 'NetcashPaymentHandler');
				return { success: false, errorMessage: 'Unable to cancel the payment' };
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during cancellation';
			Logger.error(`Error cancelling payment for Transaction ID: ${payment.transactionId}: ${errorMessage}`, 'NetcashPaymentHandler');
			return { success: false, errorMessage: errorMessage };
		}
	},

});
export default netcashPaymentHandler;