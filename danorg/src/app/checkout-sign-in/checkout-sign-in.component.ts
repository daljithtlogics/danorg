import { Component, OnInit } from '@angular/core';
import { CartService } from '../CartService';
import { StateService } from '../state.service';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { map, mergeMap, filter, switchMap  } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';

import { Order, ErrorResult, InsufficientStockError, SignInMutation, SignInMutationVariables, CurrentUser, InvalidCredentialsError, NotVerifiedError, NativeAuthStrategyError } from '../types';
import { CUSTOMER_SIGN_IN } from '../documents.graphql';


@Component({
  selector: 'app-checkout-sign-in',
  templateUrl: './checkout-sign-in.component.html',
  styleUrls: ['./checkout-sign-in.component.css']
})
export class CheckoutSignInComponent {
    
	submitted = false;
    signInForm!: UntypedFormGroup;
	activeOrder: Order | undefined;
	
	successMessage: string = '';
	errorMessage: string = '';
	
	constructor(private cartService: CartService, private toastrService: ToastrService, private apollo: Apollo, private formBuilder: UntypedFormBuilder, private stateService: StateService, private router: Router, private route: ActivatedRoute){
		this.cartService.activeOrder$.subscribe((activeOrder: Order | undefined) => {
			this.activeOrder = activeOrder;
		});		
	}
	
	get f(): { [key: string]: AbstractControl } {
		return this.signInForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	ngOnInit() {
		// Subscribe to cart changes to update the activeOrder when an item is added to the cart
		this.cartService.getActiveOrder().subscribe(
			(order: Order | undefined) => {
				// Handle the order data
				this.activeOrder = order
				console.log('Order Checkout:', order);
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
		
		//validate signin form
		this.signInForm = this.formBuilder.group({
			emailAddress: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			remember: false,
		});
	}
	
	//set Customer For Order Pipe
	loginCustomerCheckout(username: any, password: any, rememberMe: any): Observable<CurrentUser | InvalidCredentialsError | NotVerifiedError | NativeAuthStrategyError > {
		return 	this.apollo.mutate<SignInMutation, SignInMutationVariables>({
					mutation: CUSTOMER_SIGN_IN,
					variables: { 
						username: username,
						password: password,
						rememberMe: rememberMe, 
					}
				})
				.pipe(
					map(result => result?.data?.login), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable<CurrentUser | InvalidCredentialsError | NotVerifiedError | NativeAuthStrategyError >; 
	}
	
	signIn(){
		this.submitted = true;
		if (this.signInForm.valid) {
		
			// Form is valid, perform form submission here.
			console.log(this.signInForm.value); // You can use the form data for further processing.
			const emailAddressValue = this.signInForm.get('emailAddress')?.value || '';
			const passwordValue = this.signInForm.get('password')?.value || false;
			const rememberValue = this.signInForm.get('remember')?.value || '';
			this.loginCustomerCheckout(emailAddressValue, passwordValue, rememberValue).subscribe(
					(response: SignInMutation['login']) => {
					
					    console.log(response);
						// Handle the customerAddResponse
						switch (response.__typename) {
							case 'CurrentUser':
								console.log(response);
								this.stateService.setState('signedIn', true);
								this.toastrService.success('Customer assgined to order', 'Success!');
								this.successMessage = 'Customer assgined to order!';
								setTimeout(() => {
								  this.hideMessage();
								}, 5000);
								this.router.navigate(['../checkout/shipping'], {relativeTo: this.route});
							  break;
							case 'InvalidCredentialsError':						
							case 'NotVerifiedError':						
							case 'NativeAuthStrategyError':						
								const errorResponse = response as InvalidCredentialsError | NotVerifiedError | NativeAuthStrategyError;
								this.toastrService.error(errorResponse.message, 'Error!');
								this.errorMessage = errorResponse.message;
								setTimeout(() => {
									this.hideMessage();
								}, 5000);
								break;
						}
					}
				);
			
		}	
	}
}
