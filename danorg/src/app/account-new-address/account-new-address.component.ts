import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from 'rxjs'; 
import { map, mergeMap, switchMap, takeUntil, tap, filter, catchError  } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { availableCountries, CreateAddressMutation, CreateAddressMutationVariables, Address } from '../types';
import { GET_AVAILABLE_COUNTRIES } from '../documents.graphql';
import { CREATE_ADDRESS } from './account-address-add.graphql';

@Component({
  selector: 'app-account-new-address',
  templateUrl: './account-new-address.component.html',
  styleUrls: ['./account-new-address.component.css']
})
export class AccountNewAddressComponent implements OnInit {

	submitted = false;	
	addressForm!: UntypedFormGroup;
	countries: availableCountries[] = [];
	
	successMessage: string = '';
	errorMessage: string = '';

    availableCountries$: Observable<any[]> | null = null;
	
	constructor(private toastrService: ToastrService, private apollo: Apollo,private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute){}

	get f(): { [key: string]: AbstractControl } {
		return this.addressForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	ngOnInit():void {
		
		//get available countries		
		this.availableCountries$ = this.apollo
		.watchQuery<any>({
			query: GET_AVAILABLE_COUNTRIES,
		})
		.valueChanges.pipe(
			map((result) => result.data.availableCountries)
		);		
				
		this.addressForm = this.formBuilder.group({
			fullName: ['', Validators.required],
			company: ['', Validators.required],
			streetLine1: ['', Validators.required],
			streetLine2: [''],
			city: ['', Validators.required],
			countryCode: ['', Validators.required],
			province: ['', Validators.required],
			postalCode: ['', Validators.required],
			phoneNumber: ['', Validators.required],
		});

	}
	
	
	//create customer address pipe
	addAddress(value: any): Observable< Address > {
		const input = value;
		return 	this.apollo
				.mutate<CreateAddressMutation,CreateAddressMutationVariables>({
					mutation: CREATE_ADDRESS,
					variables: { input }
				})
				.pipe(
					map(result => result?.data?.createCustomerAddress), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Address >; 
	}
	
	onSubmit() {
	
	    this.submitted = true;
		if (this.addressForm.valid) {
			
			const addressFormValues = {			    
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
			
			const input = addressFormValues;
			console.log(input);
			
			this.addAddress(input).subscribe(
				(createCustomerAddress: CreateAddressMutation['createCustomerAddress']) => {
					// Handle the response
					switch (createCustomerAddress.__typename) {
						case 'Address':							
							this.toastrService.success('Address saved', 'Success!');
							this.successMessage = 'Address saved!';
							this.router.navigate(['../addresses'], {relativeTo: this.route});
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
