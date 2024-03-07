import { Component } from '@angular/core';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { map, filter  } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../state.service';

import { ResetPasswordMutation, ResetPasswordMutationVariables, CurrentUser, PasswordValidationError, PasswordResetTokenExpiredError, PasswordResetTokenInvalidError, NativeAuthStrategyError, NotVerifiedError } from '../types';
import { RESET_PASSWORD } from '../documents.graphql';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

	submitted = false;
    resetForm!: UntypedFormGroup;
	successMessage: string = '';
	errorMessage: string = '';
	private readonly token: string | undefined;
	error = '';
	
	constructor(private toastrService: ToastrService, private apollo: Apollo, private formBuilder: UntypedFormBuilder, private stateService: StateService, private route: ActivatedRoute, private router: Router){
		this.token = this.route.snapshot.queryParamMap.get('token') || undefined;
        if (!this.token) {
            this.error = 'No token provided! Cannot reset password.';
        }
	}
	
	get f(): { [key: string]: AbstractControl } {
		return this.resetForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	ngOnInit() {	
		//validate reset form
		this.resetForm = this.formBuilder.group({
			password: ['', [Validators.required]],
		});		
	}
	
	//set Customer For Order Pipe
	resetPasswordPipe(token: string, password: string,): Observable< CurrentUser | PasswordValidationError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | NativeAuthStrategyError | NotVerifiedError > {
		return 	this.apollo.mutate<ResetPasswordMutation, ResetPasswordMutationVariables>({
					mutation: RESET_PASSWORD,
					variables: { 
						token: token,
						password: password,
					}
				})
				.pipe(
					map(result => result?.data?.resetPassword), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< CurrentUser | PasswordValidationError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | NativeAuthStrategyError | NotVerifiedError >; 
	}
	
	resetPassword(){
	
	    if (this.token) {
			this.submitted = true;
			console.log(this.resetForm);
			if (this.resetForm.valid) {
			
				// Form is valid, perform form submission here.
				const passwordValue = this.resetForm.get('password')?.value || '';
				const tokenValue = this.token;

				
				this.resetPasswordPipe(tokenValue,passwordValue).subscribe(
					(response: ResetPasswordMutation['resetPassword']) => {				
						console.log(response);
						// Handle the reset password response
						switch (response.__typename) {
							case 'CurrentUser':
								const resp = response as CurrentUser;
								const successMessage = `Password Reset Successfully.`;
								this.toastrService.success(successMessage, 'Success!');
								this.successMessage = successMessage;
								this.router.navigate(['../checkout/shipping'], {relativeTo: this.route});
								this.stateService.setState('signedIn', true);		
							  break;					
							case 'PasswordValidationError':						
							case 'PasswordResetTokenExpiredError':						
							case 'PasswordResetTokenInvalidError':						
							case 'NativeAuthStrategyError':						
							case 'NotVerifiedError':						
							case 'NativeAuthStrategyError':						
								const errorResponse = response as PasswordValidationError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | NativeAuthStrategyError | NotVerifiedError;
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
}
