import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { gql, Apollo } from "apollo-angular";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Order } from '../types';
import { ORDER_BY_CODE } from './account-order-detail.graphql';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-order-detail',
  templateUrl: './account-order-detail.component.html',
  styleUrls: ['./account-order-detail.component.css']
})
export class AccountOrderDetailComponent implements OnInit{

	code = "";
	orderByCode: Order | undefined;
	constructor(private apollo: Apollo, private stateService: StateService, private route: ActivatedRoute){	
		this.code = this.route.snapshot.params["code"];
	}
	
	getOrderByCode(code:string): Observable<Order | undefined> {
	  return this.apollo.query<{ orderByCode: Order }>({
		query: ORDER_BY_CODE,
		variables: {code: code},
	  }).pipe(
		map(result => result.data?.orderByCode),
		catchError((error) => {
			console.log('error');
			// Handle the error gracefully, e.g., display an error message to the user
			return of(undefined); // Return a default or undefined value
		})
	  );
	}
	
	ngOnInit() {

		// add a SweetAlert2 popup to show retry message after payment is declined
		// the flag is in the `netcash.controller.ts` under the 'payment-success' post
		this.route.queryParams.subscribe(params => {
			if (params['error-payment-success'] === 'displaying-failed') {
					Swal.fire({
						icon: 'info',
						title: 'Payment Processed',
						text: 'Your payment was processed successfully but failed to display order confirmation page accordingly.',
						confirmButtonText: 'Ok'
					});
				}
			});
			
       this.getOrderByCode(this.code).subscribe(
			(orderByCode: Order | undefined) => {
				this.orderByCode = orderByCode;
				console.log('orderdetails', this.orderByCode);
			}
		);	
    }
}
