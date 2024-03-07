import { Injectable } from '@nestjs/common';
import { RequestContext, Payment, PaymentState, Logger, TransactionalConnection, Order, OrderState, ID, EntityHydrator, EventBus, OrderStateTransitionEvent, } from '@vendure/core';
import { NetcashNotification } from '../notification/netcash-notification';

@Injectable()
export class NetcashPaymentService {
  constructor ( 
    private connection: TransactionalConnection, 
    private entityHydrator: EntityHydrator,
    private eventBus: EventBus
  ) {}

  ////////////////////////////////////////////////////////////
  /********************* PUBLIC METHODS *********************/
  ////////////////////////////////////////////////////////////

  /**
   * Handle the incoming notification from Netcash, validate it, and update the order state accordingly.
   */
  async processNotification(ctx: RequestContext, notification: NetcashNotification): Promise<any> {

    return this.connection.withTransaction(ctx, async (ctx) => {
      // Retrieve the payment record associated with the notification
      const paymentRecord = await this.getPaymentRecord(ctx, notification.Reference);

      // Handle the error case where payment is not found
      if (!paymentRecord) {
        Logger.error(`Payment not found for Transaction ID: ${notification.Reference}`, 'NetcashPaymentService');
        throw new Error('Payment not found');
      }

      // Validate the notification data (from Pipedream) against the payment record
      if (!this.validateNotification(notification, paymentRecord)) {

        Logger.warn(`Notification validation failed for Transaction ID: ${notification.Reference}`, 'NetcashPaymentService');
        throw new Error('Notification validation failed');
      }

      // Map the 'Reason' field to a payment state
      const vendurePaymentState = this.mapNetcashReasonToVendureState(notification.Reason);

      try {
        const paymentOrder = paymentRecord.order;
        const paymentOrderId = paymentRecord.order.id;
        const paymentOrderCode = paymentRecord.order.code;

        // Update the payment state based on the notification
        await this.updatePaymentState(ctx, paymentRecord, vendurePaymentState);
        Logger.info(`Payment state updated to "${vendurePaymentState}" for Transaction ID: ${notification.Reference}`, 'NetcashPaymentService - processNotification');

        // Check if the order state needs to be updated based on the new payment state
        if (vendurePaymentState === 'Settled' && paymentOrder) {
          //Logger.info(`Retrieving order object from the payment record: ${JSON.stringify(paymentOrder, null, 2)}`, 'NetcashPaymentService');
          Logger.info(`Order object from the payment record retrieved successfully!`, 'NetcashPaymentService - Order object from payment record');

          // Fetch the order before attempting to update its state
          if (paymentOrder) {
            await this.entityHydrator.hydrate(ctx, paymentOrder, {
              relations: ['lines'],
              applyProductVariantPrices: true, // other relations needed?
            });
              Logger.info(`Current state of order ${paymentOrder.id}: "${paymentOrder.state}"`, 'NetcashPaymentService - Order State');
              Logger.info(`Order found and hydrated: ${JSON.stringify(paymentOrder, null, 2)}`, 'NetcashPaymentService - Order hydrated')

            // Use transitionOrderState to update the order state to 'PaymentSettled'
            await this.transitionOrderState(ctx, paymentOrderId, 'PaymentSettled');

          } else {
            Logger.warn(`Order object: ${JSON.stringify(paymentOrder, null, 2)}`, 'NetcashPaymentService - Order object');
            Logger.warn(`Order with ID ${paymentOrderId} not found`, 'NetcashPaymentService - 2nd else in processNotification()');
            throw new Error(`Order with ID ${paymentOrderId} not found`);
          }
        }

        // If everything goes well, return success state
        return { 
          netcashReason: notification.Reason,
          vendureState: vendurePaymentState,
          message: 'Payment state updated successfully',
          orderCode: paymentOrderCode,
					transactionId: notification.Reference
        };

      } catch (error) {
        // Handle and log errors
        Logger.error(`Error processing notification: ${error} for Transaction ID: ${notification.Reference}`, 'NetcashPaymentService');
        throw error; // Rethrow the error to rollback the transaction
      }
    });
  }

  /**
   * Update the payment record with the new state
   */
  async updatePaymentState(ctx: RequestContext, paymentRecord: Payment, netcashReason: string): Promise<void> {
    const vendurePaymentState = this.mapNetcashReasonToVendureState(netcashReason);
    Logger.info(`Vendure Payment state: "${vendurePaymentState}"`, 'NetcashPaymentService - updatePaymentState()');

    // Log the mapping for diagnostic purposes
    Logger.warn(`Mapped Netcash reason '${netcashReason}' -> to Vendure state "${vendurePaymentState}"`, 'NetcashPaymentService - updatePaymentState()');

    // Log the current state of the payment record before attempting the update
    Logger.info(`Current state for Payment ID "${paymentRecord.id}" before update: "${paymentRecord.state}"`, 'NetcashPaymentService - updatePaymentState()');

    try {
        // Use the transactional context to get the repository and perform the update operation
        const paymentRepository = this.connection.getRepository(ctx, Payment);
        const updateResult = await paymentRepository.update(
          { id: paymentRecord.id }, 
          { state: vendurePaymentState }
        );

        if (updateResult.affected && updateResult.affected > 0) {
          Logger.info(`Payment state for Payment ID "${paymentRecord.id}" updated to "${vendurePaymentState}"`, 'NetcashPaymentService - updatePaymentState()');
        } else {
          Logger.warn(`No payment record found for Payment ID: ${paymentRecord.id} to update.`, 'NetcashPaymentService');
        }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Logger.error(`Error updating payment state for Payment ID: ${paymentRecord.id}: ${errorMessage}`, 'NetcashPaymentService');
      throw new Error(`Failed to update payment state: ${errorMessage}`);
    }
  }

  /**
   * Manually transition the order to a new state while ensuring business logic is respected.
   */
  async transitionOrderState(ctx: RequestContext, orderId: ID, newState: OrderState): Promise<void> {
    try {
      // Directly update the order's state in the database
      const orderStateRepository = this.connection.getRepository(ctx, Order);
      await orderStateRepository.update(
        orderId, 
        { state: newState }
      );
      
      // Emit an event indicating the order state has changed
      // Note: Constructing the event may require additional information such as the previous state
      const order = await this.getOrderDirectly(ctx, orderId);
      if (!order) {
        Logger.warn(`Order with ID ${orderId} not found, unable to emit OrderStateTransitionEvent.`, 'NetcashPaymentService');
        return;
      }
      //console.log("order transitioned: ", order, 'transitionOrderState | getOrderDirectly - from Database')

      // event publishing with explicit 'fromState' and 'toState'
      this.eventBus.publish(new OrderStateTransitionEvent(order.state, newState, ctx, order));
      Logger.info(`Order ${orderId} state updated to ${newState} and OrderStateTransitionEvent published.`, 'NetcashPaymentService');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStack = error instanceof Error ? error.stack : 'Stack not available';
      Logger.error(`Error transitioning order ${orderId} to state ${newState}: ${errorMessage}`, 'NetcashPaymentService', errorStack);
      // Handle or rethrow the error as necessary
    }
  }

  /**
   * Cancels a payment in the system
   */
  async cancelPayment(ctx: RequestContext, transactionID: string): Promise<boolean> {
    try {
      // Attempt to update the payment state to 'Cancelled' directly
      const updateResult = await this.connection.rawConnection.getRepository(Payment).update(
          { transactionId: transactionID },
          { state: 'Cancelled' }
      );

      // Check if any records were actually updated
      if (updateResult.affected && updateResult.affected > 0) {
        Logger.info(`Payment with Transaction ID: ${transactionID} was cancelled successfully.`, 'NetcashPaymentService');
        return true;
      } else {
        Logger.warn(`No payment record found for Transaction ID: ${transactionID} to cancel.`, 'NetcashPaymentService');
        return false;
      }
    } catch (error) {
      // Check if the error is an instance of Error and log the message, otherwise log a generic error
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Logger.error(`Error cancelling payment for Transaction ID: ${transactionID}: ${errorMessage}`, 'NetcashPaymentService');
      return false;
    }
  }

  ////////////////////////////////////
  /* ------- HELPER METHODS ------- */
  ////////////////////////////////////

  /**
   * Hydrates the given order entity with specified relations.
   * 
   * This method is essential for ensuring that the order entity
   * is fully populated with related entities like order lines,
   * which might be necessary for subsequent operations or logic
   * that requires access to the complete order details.
   *
   * @param ctx - The RequestContext in which the operation is performed.
   * @param order - The order entity to be hydrated.
   * @returns The hydrated order entity.
   */
  async hydrateOrder(ctx: RequestContext, order: Order): Promise<Order> {
    if (order) {
      await this.entityHydrator.hydrate(ctx, order, { relations: ['lines'], });
    }
    return order;
  }

  /**
   * Retrieves the payment record associated with the given transaction id.
   */
  public async getPaymentRecord(ctx: RequestContext, transactionId: string): Promise<Payment | undefined> {
    try {
      // Use the transactional context to get the repository
      const paymentRepository = this.connection.rawConnection.getRepository(Payment);
      const payment = await paymentRepository.findOne({
        where: { transactionId: transactionId },
        relations: ['order' ], // Explicitly fetch the related order
      });

      // Hydrate the order entity with required relations
      if (payment && payment.order) {
        await this.entityHydrator.hydrate(ctx, payment.order, { relations: ['lines'] }); // add other relations if needed
      }

      // Log the payment record along with its relations to verify the loaded data
      // Logger.info(`Retrieved payment record: ${JSON.stringify(payment, null, 2)}`, 'NetcashPaymentService - getPaymentRecord'); // uncomment if need to see payment record
      Logger.info(`Retrieved payment record successfully!`, 'NetcashPaymentService - getPaymentRecord');

      // If payment is null, return undefined
      return payment ?? undefined;
    } catch (error) {
      Logger.error(`Failed to retrieve payment record for transaction ID ${transactionId}: ${error}`, 'NetcashPaymentService');
      return undefined;
    }
  }

  /**
   * Fetching order directly from database.
   * 
   * Since the OrderService could not find the order, 
   * this method bypasses the OrderService to directly fetch an order entity
   * from the database using its unique identifier. It's particularly useful
   * when dealing with custom logic that requires direct database access.
   */
  public async getOrderDirectly(ctx: RequestContext, orderId: ID): Promise<Order | undefined> {
    try {
        const orderRepository = this.connection.getRepository(ctx, Order);
        let order = await orderRepository.findOne({
					where: { id: orderId },
				});

        //Logger.warn(`order: ${order}`, 'getOrderDirectly - from Database')
        console.log("order from database: ", order, 'getOrderDirectly - from Database')
        // If order is not found, findOne returns null. We ensure the method returns undefined in that case.
        return order ?? undefined;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during order state transition';
      const errorStack = error instanceof Error ? error.stack : 'Stack trace not available';
      Logger.error(`Failed to fetch order with ID ${orderId}:`, errorMessage, errorStack);
      return undefined;
    }
  }

	/**
	 * Reactivate the order for payment declined
	 */
	async reactivateOrder(ctx: RequestContext, orderId: ID): Promise<void> {
    try {
        const orderRepository = this.connection.getRepository(ctx, Order);
        // Fetch the order to ensure it exists
        const order = await orderRepository.findOne({
            where: { id: orderId },
        });
        if (!order) {
            Logger.warn(`Order with ID ${orderId} not found, cannot reactivate.`, 'NetcashPaymentService');
            return;
        }
        // Update the order's active field to true
        await orderRepository.update(orderId, { active: true });

        Logger.info(`Order ${orderId} reactivated successfully.`, 'NetcashPaymentService - Reactivate Order');
    } catch (error) {
        Logger.error(`Error reactivating order ${orderId}: ${error}`, 'NetcashPaymentService - Reactivate Order');
    }
	}

	// Logic to handle declined payment and update payment state
	async handleDeclinedPayment(ctx: RequestContext, paymentId: ID): Promise<void> {
		const paymentRepository = this.connection.getRepository(ctx, Payment);
		
		// Find the specific payment attempt that was declined
		const payment = await paymentRepository.findOne({
				where: { id: paymentId },
		});

		if (payment) {
				// Update the specific payment's state to 'Declined'
				await paymentRepository.save({
						...payment,
						state: 'Declined',
				});

				Logger.info(`Payment ${paymentId} state updated to Declined.`, 'NetcashPaymentService');
		} else {
				Logger.error(`Payment with ID ${paymentId} not found.`, 'NetcashPaymentService');
		}
	}
  
  ////////////////////////////////////////////////////////////
  /********************* PRIVATE METHODS ********************/
  ////////////////////////////////////////////////////////////

  /**
   * Maps the Netcash transaction reasons to the internal Vendure payment state.
   */
  private mapNetcashReasonToVendureState(reason: string): PaymentState {
    // case = Netcash // return = Vendure
    switch (reason) {
      // Netcash reasons  - according to the Netcash doc
      case 'Success': return 'Settled'; // Accept Response URL
      case 'Declined': return 'Declined'; // Decline Response URL
      case 'Pending payment': return 'Authorized'; // Redirect Response URL
      case 'Cancelled by user': return 'Cancelled' // Cancelled by user in payment gateway
      
      // Handle these cases but investigate why they are marked at Netcash reasons
      case 'Authorized': return 'Authorized'; // where does it come from?
      case 'Settled': return 'Settled';       // why is it 'Settled' instead of 'Success'
      case 'Cancelled': return 'Cancelled';   // why is it 'Cancelled' instead of 'Cancelled by user'

    default:
      // If the state code (transaction reason) is unrecognized
      Logger.warn(`Unrecognized Netcash Transaction reason: ${reason}`, 'NetcashPaymentService - mapNetcashReasonToVendureState');
      return 'Error'; // Default fallback state
    }
  }

  /**
   * Validate the structure of the notification to the Netcash payload.
   */
  private validateNotification(notification: NetcashNotification, paymentRecord: Payment): boolean {
    Logger.warn(`Validating notification: ${JSON.stringify(notification, null, 2)}`, 'NetcashPaymentService - Start Validation');

    // Verify that all expected fields are present from the Netcash payload notification
    const expectedFields: (keyof NetcashNotification)[] = ['Reference', 'Amount', 'Reason'];
    
    for (const field of expectedFields) {
      if (notification[field] === undefined) {
        Logger.warn(`Missing expected field "${field}" in notification`, 'NetcashPaymentService - valideNotification');
        return false;
      }
    }
    
    // Compare the unique transaction reference stored in payment record (Reference)
    if (notification.Reference !== paymentRecord.transactionId) {
      Logger.warn(`Transaction ID mismatch. Expected: ${paymentRecord.transactionId}, Received: ${notification.Reference}`, 'NetcashPaymentService');
      return false;
    }

    // Floating-point comparison for amount
    const receivedAmountInCents = notification.Amount * 100;
    const expectedAmountInCents = paymentRecord.amount;
    if (Math.abs(receivedAmountInCents - paymentRecord.amount) > 0.01) { 
      Logger.warn(`Amount mismatch. Expected: ${expectedAmountInCents}, Received: ${receivedAmountInCents}`, 'NetcashPaymentService');
      return false;
    }

    return true; // If all checks pass, return true
  }

}