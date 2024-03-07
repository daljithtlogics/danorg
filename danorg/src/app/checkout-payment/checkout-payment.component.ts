import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../CartService';
import { Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Observable } from 'rxjs'; 
import { map, filter } from 'rxjs/operators';

import { TRANSITION_TO_ARRANGING_PAYMENT } from '../checkout-shipping/checkout-shipping.graphql';
import { GET_ELIGIBLE_PAYMENT_METHODS, ADD_PAYMENT_TO_ORDER } from '../documents.graphql';
import { Order, transitionOrderToStateMutation, transitionOrderToStateMutationVariable, OrderStateTransitionError, AddPaymentToOrderMutation, AddPaymentToOrderMutationVariable, OrderPaymentStateError, PaymentFailedError, PaymentDeclinedError, IneligiblePaymentMethodError, Payment } from '../types';

import { environment } from 'src/environments/environment';
import { PaymentService } from './services/payment.service';

import Swal from 'sweetalert2'; // Confirm Popup - npm install sweetalert2

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
	inFlight: boolean = false;
	cardNumber: string;
  expMonth: number;
  expYear: number;
	paymentselect: string;

	// netcashPayNowServiceKey = environment.netcashPayNowServiceKey;
    // netcashSoftwareVendorKey = environment.netcashSoftwareVendorKey;
	
	 netcashPayNowServiceKey = '5717d523-e4c7-4406-b7ab-7979ac6fa1d5';
     netcashSoftwareVendorKey = '24ade73c-98cf-47b3-99be-cc7b867b3080';

	activeOrder: Order | undefined;
	activeOrderPaymentMetadata: any; // store payment metadata

	eligibleShippingMethods$: Observable<any[]> | null = null;
	paymentMethods$: Observable<any[]> | null = null;

	isOrderConfirmed = false; // keeps track of the confirmed address
	transactionId!: string; // to store the transactionID from the backend

	constructor(
		private cartService: CartService, private toastrService: ToastrService, private apollo: Apollo, private router: Router, private route: ActivatedRoute, private paymentService: PaymentService,
		) {
		this.cardNumber = "";
		this.expMonth = 0;
		this.expYear = 0;
		this.paymentselect = '';
		this.cartService.activeOrder$.subscribe((activeOrder: Order | undefined) => { this.activeOrder = activeOrder; });
	}
	
	ngOnInit() {
		// get available payment method		
		this.paymentMethods$ = this.apollo
		.watchQuery<any>({
			query: GET_ELIGIBLE_PAYMENT_METHODS,
		})
		.valueChanges.pipe(
			map((result) => result.data.eligiblePaymentMethods)
		);

		// Subscribe to cart changes to update the activeOrder when an item is added to the cart
		this.cartService.getActiveOrder().subscribe(
			(order: Order | undefined) => {
				// Handle the order data
				this.activeOrder = order
				if (order) {
					// Assuming that the payment metadata is part of the order object
					// and it's returned by the backend as part of the createPayment process
					// this.activeOrderPaymentMetadata = order.payment && order.payment.metadata;
				}
				console.log('Order Checkout:', order);
			}, (error: any) => { console.error('API Error:', error); // Handle the error
			}, () => { /* Handle the case when no active order is found */ }
		);
	}

	getMonths(): number[] { return Array.from({ length: 12 }).map((_, i) => i + 1); }

	getYears(): number[] {
		const year = new Date().getFullYear();
		return Array.from({ length: 10 }).map((_, i) => year + i);
	}

	//set transition state for Order Pipe
	setTransitionOrderToState(state: string): Observable< Order | OrderStateTransitionError > {
	return 	this.apollo
		.mutate<transitionOrderToStateMutation, transitionOrderToStateMutationVariable>({
			mutation: TRANSITION_TO_ARRANGING_PAYMENT,
			variables: { state }
		})
		.pipe(
			map(result => result?.data?.transitionOrderToState), // Use optional chaining here
			filter(response => response !== undefined), // Filter out undefined values
		) as Observable< Order | OrderStateTransitionError >; 
	}
	
	modifyOrder() {
		// only allow changing if it hasn't beeen confirmed yet
		if (!this.isOrderConfirmed) {
		this.setTransitionOrderToState("AddingItems").subscribe((data) => 
			{	this.router.navigate(['../shipping'], {relativeTo: this.route}); });
		}
  }
	
	addPaymentToOrder(value: any): Observable<Order | OrderPaymentStateError | PaymentDeclinedError | PaymentFailedError | IneligiblePaymentMethodError | OrderStateTransitionError> {
	const input = value;
	return 	this.apollo.mutate<AddPaymentToOrderMutation, AddPaymentToOrderMutationVariable>({
		mutation: ADD_PAYMENT_TO_ORDER,
		variables: { input }
		})
		.pipe(
			map(result => result?.data?.addPaymentToOrder), // Use optional chaining here
			filter(response => response !== undefined), // Filter out undefined values
		) as Observable< Order | OrderPaymentStateError | PaymentDeclinedError | PaymentFailedError | IneligiblePaymentMethodError | OrderStateTransitionError >;
	}

	// confirm button
	confirmPayment() {
		Swal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			text: "You will not be able to modify your order after proceeding to the payment gateway.",
			confirmButtonText: 'Yes, proceed!', confirmButtonColor: '#3c3e93', 
			showCancelButton: true, cancelButtonColor: '#d33'
		}).then((result) => {
			if (result.isConfirmed) {
				this.isOrderConfirmed = true; 
				this.initiatePayment(); // payment initiation into a separate method
			}
		});
	}

	// create the payment
	initiatePayment() {
		if (!this.transactionId) {
			const paymentInput = {
				method: "netcash-payment",
				metadata: {}
			};
			this.paymentService.AddPaymentToOrderMutation(paymentInput).subscribe({
				next: (result: any) => this.handlePaymentSuccess(result),
				error: (error) => {
					console.error('Error when adding payment to order:', error);
				}
			});
		} else {
			this.toastrService.success('Order confirmed! Proceed to the payment gateway to complete your order...', 'Success!');
			this.onPayWithNetcash();
		}
	}

	handlePaymentSuccess(result: any) {
		// Extract and set the transaction ID from the response
		const response = result.data as AddPaymentToOrderMutation;

    if (response && response.addPaymentToOrder && 'payments' in response.addPaymentToOrder) {
			// Get the latest transaction Id from the last payment in the array
			const orderData = response.addPaymentToOrder as Order;

			if (orderData.payments && orderData.payments.length > 0) {
				// latest payment is at the end of the array
				const latestPayment = orderData.payments[orderData.payments.length - 1];
				this.transactionId = latestPayment.transactionId;
				console.log('Latest Transaction ID set to:', this.transactionId);
				
				this.toastrService.success('Proceeding to Netcash Payment gateway...', 'Success!');
				this.onPayWithNetcash(); // Redirect to Netcash
			}
    } else {
			console.error('Payment processing error:', result.error);
			// Handle payment processing error here
    }
	}

	// Add a getter to format the total with tax
	getPaymentAmount(): string {
		if (this.activeOrder && this.activeOrder.totalWithTax) 
		{ return (this.activeOrder.totalWithTax / 100).toFixed(2); }
    return '0.00';
	}

	// submit to Netcash
	onPayWithNetcash() {
		// Initialize an empty URLSearchParams object
		const params = new URLSearchParams();

		// Add parameters conditionally
		params.set('M1', this.netcashPayNowServiceKey);
		params.set('M2', this.netcashSoftwareVendorKey);

		if (this.activeOrder) {
			params.set('M4', this.activeOrder.id); // extra field 1 - order id
			params.set('M5', this.activeOrder.code); // extra field 2 - order code

			params.set('M9', this.activeOrder.customer.emailAddress); 
			params.set('M11', this.activeOrder.customer.phoneNumber); 
		
			params.set('p2', this.transactionId);
			
			params.set('p3', this.activeOrder.code);
		}
		
		params.set('p4', this.getPaymentAmount());
		params.set('Budget', 'Y'); 

		// Redirect to Netcash payment gateway with query params
		const queryString = params.toString();
		window.location.href = `https://paynow.netcash.co.za/site/paynow.aspx?${queryString}`;
	}

}