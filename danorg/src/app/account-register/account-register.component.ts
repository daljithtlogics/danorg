import { Component } from '@angular/core';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { map, mergeMap, filter, switchMap  } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { RegisterCustomerMutation, RegisterCustomerMutationVariables, Success, MissingPasswordError, PasswordValidationError, NativeAuthStrategyError } from '../types';
import { REGISTER_CUSTOMTER } from '../documents.graphql';

@Component({
	selector: 'app-account-register',
	templateUrl: './account-register.component.html',
	styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent {
	submitted = false;
    registerForm!: UntypedFormGroup;
	successMessage: string = '';
	errorMessage: string = '';
	
	constructor(private toastrService: ToastrService, private apollo: Apollo, private formBuilder: UntypedFormBuilder){}
	
	get f(): { [key: string]: AbstractControl } {
		return this.registerForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	
	passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const repeatPassword = control.get('repeatPassword');

		if (password && repeatPassword && password.value !== repeatPassword.value) {
			return { passwordMismatch: true };
		}
		return null;
	 }
	
	ngOnInit() {	
		//validate signin form
		this.registerForm = this.formBuilder.group({
			emailAddress: ['', [Validators.required, Validators.email]],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			phoneNumber: ['', [Validators.required]],
			password: ['', Validators.required],
			repeatPassword: ['', Validators.required],
		}, 
		{
			validators: this.passwordMatchValidator // Add the custom validator here
		});		
	}
	
	//set Customer For Order Pipe
	registerCustomer(value: any): Observable< Success | MissingPasswordError | PasswordValidationError | NativeAuthStrategyError > {
		return 	this.apollo.mutate<RegisterCustomerMutation, RegisterCustomerMutationVariables>({
					mutation: REGISTER_CUSTOMTER,
					variables: { 
						input: value,
					}
				})
				.pipe(
					map(result => result?.data?.registerCustomerAccount), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Success | MissingPasswordError | PasswordValidationError | NativeAuthStrategyError >; 
	}
	
	register(){
		this.submitted = true;
		console.log(this.registerForm);
		if (this.registerForm.valid) {		    
			// Form is valid, perform form submission here.
			
			const input = {
				firstName: this.registerForm.get('firstName')?.value || '',
				lastName: this.registerForm.get('lastName')?.value || '',
				phoneNumber: this.registerForm.get('phoneNumber')?.value || '',
				emailAddress: this.registerForm.get('emailAddress')?.value || '',
				password: this.registerForm.get('password')?.value || '',
			};
			
			this.registerCustomer(input).subscribe(
				(response: RegisterCustomerMutation['registerCustomerAccount']) => {				
					console.log(response);
					// Handle the customerRegisterResponse
					switch (response.__typename) {
						case 'Success':
							const resp = response as Success;
							if(resp.success){
							    this.registerForm.reset({},{ emitEvent: false });
								this.toastrService.success('Your account has been successfully created.', 'Success!');
								this.successMessage = 'Your account has been successfully created.';
								setTimeout(() => {
								  this.hideMessage();
								}, 5000);
							}else{
								this.toastrService.error('Your account has not been created. Please try again!', 'Success!');
								this.successMessage = 'Your account has not been created. Please try again!';
								setTimeout(() => {
								  this.hideMessage();
								}, 5000);
							}														
						  break;
						case 'MissingPasswordError':						
						case 'PasswordValidationError':						
						case 'NativeAuthStrategyError':						
							const errorResponse = response as MissingPasswordError | PasswordValidationError | NativeAuthStrategyError;
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
