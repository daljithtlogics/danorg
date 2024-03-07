import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from "apollo-angular";
import { Observable, of, Subject } from 'rxjs'; 
import { map, mergeMap, switchMap, takeUntil, tap, filter, catchError  } from 'rxjs/operators';

import { GetOrderList, GetOrderListVariables, SortOrder } from '../types';

import { GET_ORDERS } from './account-orders.graphql';

@Component({
	selector: 'app-account-orders',
	templateUrl: './account-orders.component.html',
	styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent implements OnInit{

	orders$!: Observable<GetOrderList | undefined>;
	
	page = 1;
	pageNumber = 1;
	itemsPerPage = 10;
	
	constructor(private apollo: Apollo, private route: ActivatedRoute) {
		this.page = this.route.snapshot.params["page"];
		console.log('click',this.page);
		
	}
	
	ngOnInit() {		
		this.orders$ = this.route.paramMap.pipe(
		  map(pm => pm.get('page')),          
		  switchMap(page => {
			this.pageNumber = +(page ?? 1);
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
				  take: this.itemsPerPage,
				  skip: (this.pageNumber - 1) * this.itemsPerPage,
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











