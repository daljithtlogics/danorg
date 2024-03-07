import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from 'rxjs'; 
import { map, filter, catchError  } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { ChangePasswordMutation, ChangePasswordMutationVariables, Success, InvalidCredentialsError, PasswordValidationError, NativeAuthStrategyError } from '../types';
import { CHANGE_CUSTOMER_PASSWORD } from './account-change-password.graphql';

@Component({
	selector: 'app-account-change-password',
	templateUrl: './account-change-password.component.html',
	styleUrls: ['./account-change-password.component.css']
})
export class AccountChangePasswordComponent {
	
	submitted = false;	
	passwordForm!: UntypedFormGroup;
	
	successMessage: string = '';
	errorMessage: string = '';
	
	constructor(private toastrService: ToastrService, private apollo: Apollo,private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute){}

	get f(): { [key: string]: AbstractControl } {
		return this.passwordForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}	
	
	ngOnInit():void {
		
		this.passwordForm = this.formBuilder.group({
            old: ['', Validators.required], 		
			new: ['', Validators.required],			
		});

	}	
	
	//set update customer address pipe
	changePassword(currentpassword: any, newpassword: any): Observable< Success | InvalidCredentialsError | PasswordValidationError | NativeAuthStrategyError > {
		return 	this.apollo
				.mutate<ChangePasswordMutation, ChangePasswordMutationVariables>({
					mutation: CHANGE_CUSTOMER_PASSWORD,
					variables: { 
						currentPassword: currentpassword,
						newPassword: newpassword,				
					}
				})
				.pipe(
					map(result => result?.data?.updateCustomerPassword), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Success | InvalidCredentialsError | PasswordValidationError | NativeAuthStrategyError >; 
	}
	
	onSubmit() {
	
	    this.submitted = true;
		if (this.passwordForm.valid) {
			
			const oldpass = this.passwordForm.get('old')?.value || '';
			const newpass = this.passwordForm.get('new')?.value || '';
			
			this.changePassword(oldpass, newpass).subscribe(
				(response: ChangePasswordMutation['updateCustomerPassword']) => {
					// Handle the customerAddResponse
					switch (response.__typename) {
						case 'Success':							
							this.toastrService.success('Your password updated successfully.', 'Success!');
							this.successMessage = 'Your password updated successfully.';
							// Clear the form
							this.passwordForm.reset();
							setTimeout(() => {
								this.hideMessage();
							}, 5000);
						break;
						case 'InvalidCredentialsError':						
						case 'PasswordValidationError':						
						case 'NativeAuthStrategyError':						
							const errorResponse = response as InvalidCredentialsError | PasswordValidationError | NativeAuthStrategyError;
							this.toastrService.error(errorResponse.message, 'Error!');
							this.errorMessage = errorResponse.message;
							setTimeout(() => {
								this.hideMessage();
							}, 5000);
							break;
					}
				}
			),
			(error: any) => {
				// Handle the error
				this.toastrService.error('Api Error', 'Error!');
			};		
			
			
		}else{
		
			//do nothing
			
		}
	}	
}
