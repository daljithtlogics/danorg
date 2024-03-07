import { Component, OnInit } from '@angular/core';
import { ActiveCustomerService } from '../active-customer.service';
import { gql, Apollo } from "apollo-angular";
import { Observable, of, Subject } from 'rxjs'; 
import { map, mergeMap, switchMap, filter, catchError  } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { ActiveCustomer, GetOrderList, GetOrderListVariables, SortOrder } from '../types';
import { StateService } from '../state.service';
import { GET_ORDERS } from '../account-orders/account-orders.graphql';

@Component({
	selector: 'app-account-dashboard',
	templateUrl: './account-dashboard.component.html',
	styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit{

	activeCustomer: ActiveCustomer | undefined;
	orders$!: Observable<GetOrderList | undefined>;
	
	constructor(private apollo: Apollo, private activeCustomerService: ActiveCustomerService,  private stateService: StateService, private route: ActivatedRoute){}	
	
	ngOnInit():void {
		//get active customer
		this.activeCustomerService.getActiveCustomer().subscribe((activeCustomer: ActiveCustomer | undefined) => {			
			if (activeCustomer !== null && activeCustomer !== undefined) {
				this.activeCustomer = activeCustomer;
				console.log("active customer", this.activeCustomer);
				this.stateService.setState('signedIn', true);
			} else {
				// Handle the case when activeCustomer is null or undefined
			}
		});
		
		//recent orders
		this.orders$ = this.route.paramMap.pipe(         
		  switchMap(page => {
			return this.apollo.query<{ activeCustomer: GetOrderList }, GetOrderListVariables>({
			  query: GET_ORDERS,
			  variables: {
				options: {
				  filter: {
					active: {
					  eq: false,
					},
				  },
				  sort: {
					createdAt: SortOrder.DESC,
				  },
				  take: 5,
				  skip: 0,
				},
			  },
			  fetchPolicy: 'no-cache',
			}).pipe(
			  map((result) => result.data?.activeCustomer)
			); 
		  })
		);
	}
}
