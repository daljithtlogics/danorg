import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { gql, Apollo } from "apollo-angular";

import { ActiveCustomer } from './types';
import { GET_ACTIVE_CUSTOMER } from './documents.graphql';

@Injectable({
	providedIn: 'root'
})
export class ActiveCustomerService {

	//private activeCustomerSubject: BehaviorSubject<Order | undefined> = new BehaviorSubject<ActiveCustomer | undefined>(undefined);
    //public activeCustomer$ = this.activeCustomerSubject.asObservable();
	
	constructor(private apollo: Apollo) { }
	
	getActiveCustomer(): Observable<ActiveCustomer | undefined> {
	  return this.apollo.query<{ activeCustomer: ActiveCustomer }>({
		query: GET_ACTIVE_CUSTOMER,
		fetchPolicy: 'no-cache',
	  }).pipe(
		map(result => result.data?.activeCustomer)
	  );
	}
	
}
