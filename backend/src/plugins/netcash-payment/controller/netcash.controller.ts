import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestContext, Logger } from '@vendure/core';
import { NetcashPaymentService } from '../service/netcash.service';
import { NetcashNotification } from '../notification/netcash-notification';

@Controller('netcash')
export class NetcashController {
  constructor( 
    private readonly netcashPaymentService: NetcashPaymentService,
  ) {}

  /**
   * Handling the Notify Response from Netcash.
   * @param notification The notification data from Netcash
   * @param req The raw request object from Express
   * @returns a response string
   */
  @Post('notify')
  async handleNotifyResponse(
      @Body() notification: NetcashNotification,
      @Req() req: Request // Inject the raw request object
    ): Promise<string> {
    const ctx = RequestContext.empty(); // placeholder for actual context creation

    // Log the raw request body from Netcash Notification
    Logger.info(`Body: ${JSON.stringify(req.body, null, 2)}`, 'Netcash Controller - Netcash Raw Request');

    try {
      // Process the notification
      const result = await this.netcashPaymentService.processNotification(ctx, notification);
      Logger.warn(`Notification Body: ${JSON.stringify(result, null, 2)}`, 'NetcashController - Netcash Raw Request')

      if (result.vendureState === 'Error') {
        Logger.error(`Error processing notification: ${result.message}`, 'NetcashController');
        return 'Error processing notification';
      }

			// log processed notification
      Logger.info('Notification processed successfully', 'NetcashController');
      return 'Notification processed successfully';
    } catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during processing Netcash notification';
      const errorStack = error instanceof Error ? error.stack : 'Stack not available';

      Logger.error(`Server error due to ${errorMessage}`, 'NetcashController', errorStack);
      
			return 'Server error';
    }
  }

  /**
   * Handling the successful Response from Netcash.
   * @param notification The notification data from Netcash
   * @param req The raw request object from Express
   * @returns a response string
   */
  @Post('payment-success')
  async handlePaymentSuccess(@Body() notification: NetcashNotification, @Res() res: Response) {
    const ctx = RequestContext.empty(); // placeholder for actual context creation

    try {
      // Process the notification with payment service
      const result = await this.netcashPaymentService.processNotification(ctx, notification);
      Logger.warn(`Body for Successfull Transaction: ${JSON.stringify(result, null, 2)}`, 'PaymentController - Payment Success')

			// Get the transaction id from the payment record
			const paymentRecordTransactionId = await this.netcashPaymentService.getPaymentRecord(ctx, notification.Reference);

      // Redirect to the order confirmation page in the frontend with corresponding query params
      if (result.netcashReason === 'Success') {
        res.redirect(`http://157.245.36.128:5200/danshop/checkout/confirmation/${result.orderCode}`);
      } 
			else if (result.transactionId != paymentRecordTransactionId) {
				res.redirect(`http://157.245.36.128:5200/page-not-found?error-payment-success=transaction-id-mismatch`)
			} 
			else {
				// Handle error with successful payment cases as needed
				res.redirect(`http://157.245.36.128:5200/danshop/account/order-details/${result.orderCode}?error-payment-success=displaying-failed`); // flag for account order details page
			}
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during processing the payment';
      const errorStack = error instanceof Error ? error.stack : 'Stack not available';

      Logger.error(`Error processing Netcash payment success due to ${errorMessage}`, 'PaymentController', errorStack);
      
      // Redirect or respond with error handling 
      res.redirect(`http://157.245.36.128:5200/page-not-found?error-payment-success=error`);
    }
  }

  /**
   * Handling the Declined Payment Response from Netcash.
   * @param notification The notification data from Netcash indicating a declined payment
   * @param res The response object from Express
   */
  @Post('payment-declined')
  async handlePaymentDeclined(@Body() notification: NetcashNotification, @Res() res: Response) {
    const ctx = RequestContext.empty(); // Placeholder for actual context creation
    Logger.info(`Body for Declined Transaction: ${JSON.stringify(notification, null, 2)}`, 'NetcashController - Payment Declined');

    try {
			// notification includes an order ID (Extra1)
      const orderId = notification.Extra1;
			
			// Reactivate the order by setting its active flag to true
			await this.netcashPaymentService.reactivateOrder(ctx, orderId);

			// Logic to revert the order's state to keep it in the cart
			await this.netcashPaymentService.transitionOrderState(ctx, orderId, 'ArrangingPayment');

			Logger.info(`Order ${orderId} state reverted to allow payment retry.`, 'NetcashController - Order Reactivated');

      // Redirect to checkout page with SweetAlert2 popup message
      res.redirect(`http://157.245.36.128:5200/danshop/cart?payment=declined`); // flag for cart page
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during processing the declined payment';
      const errorStack = error instanceof Error ? error.stack : 'Stack not available';

			Logger.error(`Error handling declined payment due to ${errorMessage}`, 'NetcashController', errorStack);
      
			// Redirect or respond with error handling 
			res.redirect(`http://157.245.36.128:5200/page-not-found?error-payment-declined=error`);
    }
  }

  /**
   * Handling the Payment Redirect Response from Netcash.
   * This redirects the user to the site while waiting for payment to be made.
   * @param notification The notification data from Netcash indicating the need for redirection.
   * @param res The response object from Express.
   */
  @Post('payment-redirect')
  async handlePaymentRedirect(@Body() notification: NetcashNotification, @Res() res: Response) {
    const ctx = RequestContext.empty(); // Placeholder for actual context creation
    Logger.info(`Received payment redirect notification: ${JSON.stringify(notification, null, 2)}`, 'NetcashController - Payment Redirect');

    try {
      const result = await this.netcashPaymentService.processNotification(ctx, notification);
      Logger.info(`Payment redirect processed: ${JSON.stringify(result, null, 2)}`, 'NetcashController - Payment Redirect');

      // notification includes an order ID (Extra1)
      const orderId = notification.Extra1;

			// Update order state to 'Cancelled' to cancel the transaction
			await this.netcashPaymentService.transitionOrderState(ctx, orderId, 'Cancelled');
      
			// Add query parameter if transaction was cancelled by the user in the payment gateway
			const redirectUrl = notification.Reason === 'Cancelled by user'
				? `http://157.245.36.128:5200/danshop/account/order-details/${result.orderCode}?payment=cancelled` // flag for account order details page 
				: `http://157.245.36.128:5200/danshop/account/order-details/${result.orderCode}`;

      // Redirect to account order details page
      res.redirect(redirectUrl);
    } catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during redirecting the cancelled payment';
      const errorStack = error instanceof Error ? error.stack : 'Stack not available';

      Logger.error(`Error handling payment redirect: ${errorMessage}`, 'NetcashController', errorStack);

			// Redirect or respond with error handling 
      res.redirect(`http://157.245.36.128:5200/page-not-found?error-payment-redirect=error`);
    }
  }

}