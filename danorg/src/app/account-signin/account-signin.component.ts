import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { map, mergeMap, filter, switchMap  } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';


import { SignInMutation, SignInMutationVariables, CurrentUser, InvalidCredentialsError, NotVerifiedError, NativeAuthStrategyError } from '../types';
import { CUSTOMER_SIGN_IN } from '../documents.graphql';

@Component({
	selector: 'app-account-signin',
	templateUrl: './account-signin.component.html',
	styleUrls: ['./account-signin.component.css']
})
export class AccountSigninComponent {

	submitted = false;
    signInForm!: UntypedFormGroup;
	successMessage: string = '';
	errorMessage: string = '';
	
	constructor(private toastrService: ToastrService, private apollo: Apollo, private formBuilder: UntypedFormBuilder, private stateService: StateService, private router: Router, private route: ActivatedRoute){}
	
	get f(): { [key: string]: AbstractControl } {
		return this.signInForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	ngOnInit() {	
		//validate signin form
		this.signInForm = this.formBuilder.group({
			emailAddress: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			remember: false,
		});		
	}
	
	//set Customer For Order Pipe
	loginCustomer(username: any, password: any, rememberMe: any): Observable<CurrentUser | InvalidCredentialsError | NotVerifiedError | NativeAuthStrategyError > {
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
			//console.log(this.signInForm.value); // You can use the form data for further processing.
			const emailAddressValue = this.signInForm.get('emailAddress')?.value || '';
			const passwordValue = this.signInForm.get('password')?.value || false;
			const rememberValue = this.signInForm.get('remember')?.value || '';
			this.loginCustomer(emailAddressValue, passwordValue, rememberValue).subscribe(
					(response: SignInMutation['login']) => {
						// Handle the customerAddResponse
						switch (response.__typename) {
							case 'CurrentUser':
								//console.log(response);
								this.stateService.setState('signedIn', true);
								this.toastrService.success('You have successfully signed in.', 'Success!');
								this.successMessage = 'You have successfully signed in.';
								setTimeout(() => {
								  this.hideMessage();
								}, 5000);
								this.router.navigate(['../'], {relativeTo: this.route});
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
