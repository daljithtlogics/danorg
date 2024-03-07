import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from 'rxjs'; 
import { map, mergeMap, switchMap, takeUntil, tap, filter, catchError  } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { availableCountries, CustomerAddress, UpdateAddressMutation, UpdateAddressMutationVariables, Address } from '../types';
import { GET_AVAILABLE_COUNTRIES, GET_CUSTOMER_ADDRESSES } from '../documents.graphql';
import { UPDATE_ADDRESS } from './account-address-edit.graphql';

@Component({
	selector: 'app-account-address-edit',
	templateUrl: './account-address-edit.component.html',
	styleUrls: ['./account-address-edit.component.css']
})
export class AccountAddressEditComponent implements OnInit{

	submitted = false;	
	addressForm!: UntypedFormGroup;
	countries: availableCountries[] = [];
	
	successMessage: string = '';
	errorMessage: string = '';

    availableCountries$: Observable<any[]> | null = null;
	address$!: Observable<CustomerAddress | undefined>;
	activeCustomer: CustomerAddress | undefined;
	
	constructor(private toastrService: ToastrService, private apollo: Apollo,private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute){}

	get f(): { [key: string]: AbstractControl } {
		return this.addressForm.controls;
	}
	
	hideMessage() {
		this.successMessage = ''; // Clear the success message
		this.errorMessage = ''; // Clear the success message
	}
	
	notNullOrUndefined<T>(value: T | null | undefined): value is T {
		return value !== null && value !== undefined;
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
		
		this.address$ = this.route.paramMap.pipe(
			map(pm => pm.get('id')),
			filter(this.notNullOrUndefined),
			switchMap(id => {
				return this.apollo.query<{ activeCustomer: CustomerAddress }>({
					query: GET_CUSTOMER_ADDRESSES,
					fetchPolicy: 'no-cache'
				}).pipe(
					map(result => result.data?.activeCustomer),
					filter(this.notNullOrUndefined)
				);
			})
		);
		
		this.address$.subscribe(
			(activeCustomer: CustomerAddress | undefined) => {
				// Handle address data
				this.activeCustomer = activeCustomer;
				if (this.activeCustomer?.addresses) {
					const address = this.activeCustomer.addresses;
					console.log('address', address);
					this.addressForm.patchValue({
					    id: address[0].id,
						fullName: address[0].fullName,
						company: address[0].company,
						streetLine1: address[0].streetLine1,
						streetLine2: address[0].streetLine2,
						city: address[0].city,
						countryCode: address[0].country.code,
						province: address[0].province,
						postalCode: address[0].postalCode,
						phoneNumber: address[0].phoneNumber,
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
            id: ['', Validators.required], 		
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
	
	
	//set update customer address pipe
	updateAddress(value: any): Observable< Address > {
		const input = value;
		return 	this.apollo
				.mutate<UpdateAddressMutation, UpdateAddressMutationVariables>({
					mutation: UPDATE_ADDRESS,
					variables: { input }
				})
				.pipe(
					map(result => result?.data?.updateCustomerAddress), // Use optional chaining here
					filter(response => response !== undefined), // Filter out undefined values
				) as Observable< Address >; 
	}
	
	onSubmit() {
	
	    this.submitted = true;
		if (this.addressForm.valid) {
			
			const addressFormValues = {
			    id: this.addressForm.get('id')?.value || '', 
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
			
			this.updateAddress(input).subscribe(
				(updateCustomerAddress: UpdateAddressMutation['updateCustomerAddress']) => {
					// Handle the response
					switch (updateCustomerAddress.__typename) {
						case 'Address':							
							this.toastrService.success('Address saved', 'Success!');
							this.successMessage = 'Address saved!';
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
