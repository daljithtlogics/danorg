import { Component } from '@angular/core';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { map, filter  } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { RequestPasswordResetMutation, RequestPasswordResetMutationVariables, Success, NativeAuthStrategyError } from '../types';
import { REQUEST_RESET_PASSWORD } from '../documents.graphql';

@Component({
	selector: 'app-account-forgot-password',
	templateUrl: './account-forgot-password.component.html',
	styleUrls: ['./account-forgot-password.component.css']
})
export class AccountForgotPasswordComponent {
	submitted = false;
    forgotForm!: UntypedFormGroup;
	successMessage: string = '';
	errorMessage: string = '';
	
	constructor(private toastrService: ToastrService, private apollo: Apollo, private formBuilder: UntypedFormBuilder){}
	
	get f(): { [key: string]: AbstractControl } {
		return this.forgotForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	ngOnInit() {	
		//validate signin form
		this.forgotForm = this.formBuilder.group({
			emailAddress: ['', [Validators.required, Validators.email]],
		});		
	}
	
	//set Customer For Order Pipe
	requestResetPassword(emailAddress: string): Observable< Success | NativeAuthStrategyError > {
		return 	this.apollo.mutate<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>({
					mutation: REQUEST_RESET_PASSWORD,
					variables: { 
						emailAddress: emailAddress,
					}
				})
				.pipe(
					map(result => result?.data?.requestPasswordReset), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Success | NativeAuthStrategyError >; 
	}
	
	requestPassword(){
		this.submitted = true;
		console.log(this.forgotForm);
		if (this.forgotForm.valid) {
		
			// Form is valid, perform form submission here.
			const emailAddressValue = this.forgotForm.get('emailAddress')?.value || '';

			
			this.requestResetPassword(emailAddressValue).subscribe(
				(response: RequestPasswordResetMutation['requestPasswordReset']) => {				
					console.log(response);
					// Handle the customerRegisterResponse
					switch (response.__typename) {
						case 'Success':
							const resp = response as Success;
							if(resp.success){
							    this.forgotForm.reset({},{ emitEvent: false });
								const successMessage = `An email has been sent to ${emailAddressValue}. Please check and follow the included instructions.`;
								this.toastrService.success(successMessage, 'Success!');
								this.successMessage = successMessage;
								/*setTimeout(() => {
								  this.hideMessage();
								}, 20000);*/
							}else{
								this.toastrService.error('Error. Please try again!', 'Success!');
								this.successMessage = 'Error. Please try again!';
								setTimeout(() => {
								  this.hideMessage();
								}, 5000);
							}														
						  break;					
						case 'NativeAuthStrategyError':						
							const errorResponse = response as NativeAuthStrategyError;
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
