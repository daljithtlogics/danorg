import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../CartService';
import { ActiveCustomerService } from '../active-customer.service';
import { StateService } from '../state.service';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from 'rxjs'; 
import { map, mergeMap, switchMap, takeUntil, tap, filter, catchError  } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { 
	Order, availableCountries, 
	
	NoActiveOrderError, 
	ErrorResult, InsufficientStockError, 
	
	setShippingAddressMutation, setShippingAddressMutationVariable, 
	setBillingAddressMutation, setBillingAddressMutationVariable, 

	setShippingMethodMutation, setShippingMethodMutationVariable, 
	eligibleShippingMethods, IneligibleShippingMethodError, 

	ActiveCustomer, GetCustomerAddress,
	setCustomerForOrderMutation, setCustomerForOrderMutationVariable, 

	AlreadyLoggedInError, 
	EmailAddressConflictError, 
	OrderModificationError, 
	
	transitionOrderToStateMutation, transitionOrderToStateMutationVariable, 
	OrderStateTransitionError,

	AddPaymentToOrderMutation, 
	AddPaymentToOrderMutationVariable, 
} from '../types';

import { 
	GET_AVAILABLE_COUNTRIES, 
	GET_ELIGIBLE_SHIPPING_METHODS, 
	GET_CUSTOMER_ADDRESS
} from '../documents.graphql';

import { 
	SET_SHIPPING_ADDRESS, 
	SET_BILLING_ADDRESS, 
	SET_CUSTOMER_FOR_ORDER, 
	SET_SHIPPING_METHOD, 
	TRANSITION_TO_ARRANGING_PAYMENT
} from './checkout-shipping.graphql';

@Component({
	selector: 'app-checkout-shipping',
	templateUrl: './checkout-shipping.component.html',
	styleUrls: ['./checkout-shipping.component.css']
})
export class CheckoutShippingComponent implements OnInit, OnDestroy{
	
	submitted = false;
	shippingMethodId: string | undefined;
	addressForm!: UntypedFormGroup;
	addressForm2!: UntypedFormGroup;
	addressForm3!: UntypedFormGroup;
	activeOrder: Order | undefined;
	activeCustomer: ActiveCustomer | undefined;
	countries: availableCountries[] = [];
    activeOrderCustomer: GetCustomerAddress | undefined;
	
	successMessage: string = '';
	errorMessage: string = '';

    eligibleShippingMethods$: Observable<any[]> | null = null;
    availableCountries$: Observable<any[]> | null = null;
	//customerData$: Observable<any[]> | null = null;
	customerData$!: Observable<GetCustomerAddress | undefined>
	
	private destroy$ = new Subject<void>();
	
	signedIn$!: Observable<boolean>;
	
	constructor(
				private cartService: CartService, 
				private toastrService: ToastrService, 
				private apollo: Apollo, 
				private formBuilder: UntypedFormBuilder, 
				private stateService: StateService, 
				private router: Router, 
				private route: ActivatedRoute, 
				private activeCustomerService: ActiveCustomerService
			) {
		this.cartService.activeOrder$.subscribe((activeOrder: Order | undefined) => {
			this.activeOrder = activeOrder;
		});		
	}	
	
	get f(): { [key: string]: AbstractControl } {
		return this.addressForm.controls;
	}

	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	ngOnInit():void {
		
		//get active customer
		this.activeCustomerService.getActiveCustomer().subscribe((activeCustomer: ActiveCustomer | undefined) => {			
			if (activeCustomer !== null && activeCustomer !== undefined) {
				this.activeCustomer = activeCustomer;
				console.log("active customer", this.activeCustomer);
				this.stateService.setState('signedIn', true);
			} else {
				// Handle the case when activeCustomer is null or undefined
			}
		});
		
		//check customer Signin
	    this.signedIn$ = this.stateService.select(state => state.signedIn);		
		
		//get available countries		
		this.availableCountries$ = this.apollo
		.watchQuery<any>({
			query: GET_AVAILABLE_COUNTRIES,
		})
		.valueChanges.pipe(
			map((result) => result.data.availableCountries)
		);
		
		//get shipping methods		
		this.eligibleShippingMethods$ = this.apollo
		.watchQuery<any>({
			query: GET_ELIGIBLE_SHIPPING_METHODS,
		})
		.valueChanges.pipe(
			map((result) => result.data.eligibleShippingMethods)
		);

		// Subscribe to cart changes to update the activeOrder when an item is added to the cart
		this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
			// Update the activeOrderSubject in the CartService
			this.cartService.updateActiveOrder(activeOrder);
		});
		
		this.cartService.getActiveOrder().pipe(
			takeUntil(this.destroy$)
		)
		.subscribe(
			(order: Order | undefined) => {
				// Handle the order data
				this.activeOrder = order;
			},
			(error: any) => {
				// Handle the error
				console.error('API Error:', error);
			},
			() => {
				// Handle the case when no active order is found
				//console.log('No active order found.');
			}
		);
		
		//get customer address pipe
		this.customerData$ = this.apollo.watchQuery<{ activeOrder: GetCustomerAddress }>({
			query: GET_CUSTOMER_ADDRESS,
			fetchPolicy: 'no-cache',
		}).valueChanges.pipe(		    
			map(result => result.data.activeOrder),
			takeUntil(this.destroy$)
		); 
		
		this.customerData$.subscribe(
			(activeOrderCustomer: GetCustomerAddress | undefined) => {
				// Handle the order data
				this.activeOrderCustomer = activeOrderCustomer;
				if (this.activeOrderCustomer?.shippingAddress && this.activeOrderCustomer?.customer) {
					const shippingAddress = this.activeOrderCustomer.shippingAddress;
					const customerInformation = this.activeOrderCustomer.customer;
					this.addressForm.patchValue({
						firstName: customerInformation.firstName,
						lastName: customerInformation.lastName,
						emailAddress: customerInformation.emailAddress,
						fullName: shippingAddress.fullName,
						company: shippingAddress.company,
						streetLine1: shippingAddress.streetLine1,
						streetLine2: shippingAddress.streetLine2,
						city: shippingAddress.city,
						countryCode: shippingAddress.countryCode,
						province: shippingAddress.province,
						postalCode: shippingAddress.postalCode,
						phoneNumber: shippingAddress.phoneNumber,
					});
				}else if(this.activeOrderCustomer?.customer == null && this.activeOrderCustomer?.shippingAddress){
					const shippingAddress = this.activeOrderCustomer.shippingAddress;
					this.addressForm.patchValue({
					    firstName: '',
						lastName: '',
						emailAddress: '',
						fullName: shippingAddress.fullName,
						company: shippingAddress.company,
						streetLine1: shippingAddress.streetLine1,
						streetLine2: shippingAddress.streetLine2,
						city: shippingAddress.city,
						countryCode: shippingAddress.countryCode,
						province: shippingAddress.province,
						postalCode: shippingAddress.postalCode,
						phoneNumber: shippingAddress.phoneNumber,
					});
				}
				
			},
			(error: any) => {
				// Handle the error
				console.error('API Error:', error);
			},
			() => {
				// Handle the case when no active order is found
				//console.log('No active order found.');
			}
		);
		
		this.addressForm = this.formBuilder.group({
			emailAddress: ['', [Validators.required, Validators.email]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			fullName: ['', Validators.required],
			company: ['', Validators.required],
			streetLine1: ['', Validators.required],
			streetLine2: [''],
			city: ['', Validators.required],
			countryCode: ['', Validators.required],
			province: ['', Validators.required],
			postalCode: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			deliveryMethod: ['', Validators.required],
		});
		
		const addressForm2Values = {
			company: this.addressForm.get('company')?.value || '',
			streetLine1: this.addressForm.get('streetLine1')?.value || '',
			streetLine2: this.addressForm.get('streetLine2')?.value || '',
			city: this.addressForm.get('city')?.value || '',
			countryCode: this.addressForm.get('countryCode')?.value || '',
			province: this.addressForm.get('province')?.value || '',
			postalCode: this.addressForm.get('postalCode')?.value || '',
			phoneNumber: this.addressForm.get('phoneNumber')?.value || '',
		};
		this.addressForm2 = this.formBuilder.group(addressForm2Values);
		
		const addressForm3Values = {
			company: this.addressForm.get('company')?.value || '',
			streetLine1: this.addressForm.get('streetLine1')?.value || '',
			streetLine2: this.addressForm.get('streetLine2')?.value || '',
			city: this.addressForm.get('city')?.value || '',
			countryCode: this.addressForm.get('countryCode')?.value || '',
			province: this.addressForm.get('province')?.value || '',
			postalCode: this.addressForm.get('postalCode')?.value || '',
			phoneNumber: this.addressForm.get('phoneNumber')?.value || '',
		};
		this.addressForm3 = this.formBuilder.group(addressForm3Values);

	}
	
	ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
	
	//get shipping method id
	setShippingMethod(id: string) {
        this.shippingMethodId = id;
		console.log(this.shippingMethodId);
    }
	
	//set shipping address pipe
	setShippingAddress(value: any): Observable<Order | NoActiveOrderError > {
		const input = value;
		return 	this.apollo
				.mutate<setShippingAddressMutation, setShippingAddressMutationVariable>({
					mutation: SET_SHIPPING_ADDRESS,
					variables: { input }
				})
				.pipe(
					map(result => result?.data?.setOrderShippingAddress), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable<Order | NoActiveOrderError >; 
	}
	
	//set Billing address pipe
	setBillingAddress(value: any): Observable<Order | NoActiveOrderError > {
		const input = value;
		return 	this.apollo
				.mutate<setBillingAddressMutation, setBillingAddressMutationVariable>({
					mutation: SET_BILLING_ADDRESS,
					variables: { input }
				})
				.pipe(
					map(result => result?.data?.setOrderBillingAddress), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Order | NoActiveOrderError >; 
	}
	
	//set Customer For Order Pipe
	setCustomerForOrder(value: any): Observable<Order | AlreadyLoggedInError | EmailAddressConflictError | NoActiveOrderError > {
		const input = value;
		return 	this.apollo
				.mutate<setCustomerForOrderMutation, setCustomerForOrderMutationVariable>({
					mutation: SET_CUSTOMER_FOR_ORDER,
					variables: { input }
				})
				.pipe(
					map(result => result?.data?.setCustomerForOrder), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Order | AlreadyLoggedInError | EmailAddressConflictError | NoActiveOrderError >; 
	}
	
	//set shipping method For Order Pipe
	setShippingForOrder(id: string): Observable<Order | OrderModificationError | IneligibleShippingMethodError | NoActiveOrderError> {
		return 	this.apollo
				.mutate<setShippingMethodMutation, setShippingMethodMutationVariable>({
					mutation: SET_SHIPPING_METHOD,
					variables: { id }
				})
				.pipe(
					map(result => result?.data?.setOrderShippingMethod), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Order | OrderModificationError | IneligibleShippingMethodError | NoActiveOrderError >; 
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
	
	onSubmit() {
		this.submitted = true;
		if (this.addressForm.valid) {
		
			// Form is valid, perform form submission here.
			console.log(this.addressForm.value); // You can use the form data for further processing.
			const addressForm2Values = {
				fullName: this.addressForm.get('fullName')?.value || '',
				company: this.addressForm.get('company')?.value || '',
				streetLine1: this.addressForm.get('streetLine1')?.value || '',
				streetLine2: this.addressForm.get('streetLine2')?.value || '',
				city: this.addressForm.get('city')?.value || '',
				countryCode: this.addressForm.get('countryCode')?.value || '',
				province: this.addressForm.get('province')?.value || '',
				postalCode: this.addressForm.get('postalCode')?.value || '',
				phoneNumber: this.addressForm.get('phoneNumber')?.value || '',
			};
			
			const addressForm3Values = {
				firstName: this.addressForm.get('firstName')?.value || '',
				lastName: this.addressForm.get('lastName')?.value || '',
				emailAddress: this.addressForm.get('emailAddress')?.value || '',				
				phoneNumber: this.addressForm.get('phoneNumber')?.value || '',
			};

			const input = addressForm2Values;
			const customerForm = addressForm3Values;
			
			// Perform the setShippingAddress mutation
			this.setShippingAddress(input).pipe(
				switchMap((shippingResponse) => {
					// Handle the shippingResponse
					console.log(shippingResponse);
					switch (shippingResponse.__typename) {
						case 'Order':
							const shippingAddress = shippingResponse as Order;
							console.log('shippingAddress', shippingResponse);
							this.toastrService.success('Shipping address saved', 'Success!');
							this.successMessage = 'Shipping address saved!';
							setTimeout(() => {
								this.hideMessage();
							}, 5000);
							break;
						case 'NoActiveOrderError':
							const errorResponse = shippingResponse as NoActiveOrderError;
							this.toastrService.error(errorResponse.message, 'Error!');
							this.errorMessage = errorResponse.message;
							setTimeout(() => {
								this.hideMessage();
							}, 5000);
							console.log(shippingResponse);
							break;
					}
					// Perform the setBillingAddress mutation
					return this.setBillingAddress(input);
				})
			).subscribe(
				(billingResponse: setBillingAddressMutation['setOrderBillingAddress']) => {
					// Handle the billingResponse
					switch (billingResponse.__typename) {
						case 'Order':
							const billingAddress = billingResponse as Order;
							this.toastrService.success('Billing address saved', 'Success!');
							break;
						case 'NoActiveOrderError':
							const errorResponse = billingResponse as NoActiveOrderError;
							this.toastrService.error(errorResponse.message, 'Error!');
							break;
					}
				}
			);
			
			//set customer, shipping method
			const shippingMethodId = this.shippingMethodId;
			
			if (shippingMethodId) {				
				this.stateService.select(state => state.signedIn).pipe(
					mergeMap(signedIn => !signedIn ? this.setCustomerForOrder(customerForm) || of({}) : of({})),
					mergeMap(() =>
						this.setShippingForOrder(shippingMethodId)						
					),
					mergeMap(() => 
						this.setTransitionOrderToState("ArrangingPayment")
					),
				).subscribe((data) => {
				    this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
						// Update the activeOrderSubject in the CartService
						this.cartService.updateActiveOrder(activeOrder);
					});
					this.router.navigate(['../payment'], {relativeTo: this.route});
				}); 
			}
		}
	}
}