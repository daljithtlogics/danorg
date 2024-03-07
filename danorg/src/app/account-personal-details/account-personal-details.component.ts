import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from 'rxjs'; 
import { map, mergeMap, switchMap, takeUntil, tap, filter, catchError  } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { ActiveCustomerService } from '../active-customer.service'
import { ActiveCustomer, UpdateCustomerMutation, UpdateCustomerMutationVariables, Customer } from '../types';
import { StateService } from '../state.service';
import { UPDATE_CUSTOMER_DETAILS } from './account-personal-detail.graphql';

@Component({
	selector: 'app-account-personal-details',
	templateUrl: './account-personal-details.component.html',
	styleUrls: ['./account-personal-details.component.css']
})

export class AccountPersonalDetailsComponent  implements OnInit{

     
	submitted = false;	
	personalForm!: UntypedFormGroup;
	
	successMessage: string = '';
	errorMessage: string = '';

    activeCustomer: ActiveCustomer | undefined;	
	
	constructor(private toastrService: ToastrService, private apollo: Apollo,private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute,  private activeCustomerService: ActiveCustomerService,  private stateService: StateService){}

	get f(): { [key: string]: AbstractControl } {
		return this.personalForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	notNullOrUndefined<T>(value: T | null | undefined): value is T {
		return value !== null && value !== undefined;
	}
	
	ngOnInit():void {
        
        		
		//get active customer
		this.activeCustomerService.getActiveCustomer().subscribe((activeCustomer: ActiveCustomer | undefined) => {			
			if (activeCustomer !== null && activeCustomer !== undefined) {
				this.activeCustomer = activeCustomer;
				this.stateService.setState('signedIn', true);
				this.personalForm.patchValue({
					firstName: this.activeCustomer.firstName,
					lastName: this.activeCustomer.lastName,
					phoneNumber: this.activeCustomer.phoneNumber,
				});				
			} else {
				// Handle the case when activeCustomer is null or undefined
			}
		});
		
		this.personalForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			phoneNumber: ['', Validators.required],			
		});

	}

    //set update customer address pipe
	updateCustomer(value: any): Observable< Customer > {
		const input = value;
		return 	this.apollo
				.mutate<UpdateCustomerMutation, UpdateCustomerMutationVariables>({
					mutation: UPDATE_CUSTOMER_DETAILS,
					variables: { input }
				})
				.pipe(
					map(result => result?.data?.updateCustomer), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Customer >; 
	}	
	
	onSubmit() {
	
	    this.submitted = true;
		if (this.personalForm.valid) {
			
			const personalFormValues = {			    
				firstName: this.personalForm.get('firstName')?.value || '',
				lastName: this.personalForm.get('lastName')?.value || '',				
				phoneNumber: this.personalForm.get('phoneNumber')?.value || '',
			};
			
			const input = personalFormValues;
			console.log(input);
			
			this.updateCustomer(input).subscribe(
				(updateCustomer: UpdateCustomerMutation['updateCustomer']) => {
					// Handle the response
					switch (updateCustomer.__typename) {
						case 'Customer':							
							this.toastrService.success('Personal details saved', 'Success!');
							this.successMessage = 'Personal details saved!';
							setTimeout(() => {
								this.hideMessage();
							}, 5000);
							break;
						default:							
							this.toastrService.error("Error occured. Please try again", 'Error!');
							this.errorMessage = "Error occured. Please try again";
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
