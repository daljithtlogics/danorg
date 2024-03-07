import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from "apollo-angular";
import { Observable } from 'rxjs'; 
import { map, filter, catchError  } from 'rxjs/operators';

import { CustomerAddress } from '../types';
import { GET_CUSTOMER_ADDRESSES } from '../documents.graphql';

@Component({
	selector: 'app-account-addresses',
	templateUrl: './account-addresses.component.html',
	styleUrls: ['./account-addresses.component.css']
})
export class AccountAddressesComponent {
	
	addresses$!: Observable<CustomerAddress | undefined>;
	
	constructor(private apollo: Apollo) { }
	
	ngOnInit() {
	
	    this.addresses$ = this.apollo.query<{ activeCustomer: CustomerAddress }>({
			query: GET_CUSTOMER_ADDRESSES,			
			fetchPolicy: 'no-cache',
		}).pipe(
			map((result) => result.data?.activeCustomer)
		); 
		
		console.log(this.addresses$);
		
    }
}
