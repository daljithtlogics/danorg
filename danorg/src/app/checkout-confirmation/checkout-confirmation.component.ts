import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { gql, Apollo } from "apollo-angular";
import { filter, map, mergeMap, shareReplay, switchMap, take, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Order } from '../types';
import { ORDER_BY_CODE } from './checkout-confirmation.graphql';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.css']
})
export class CheckoutConfirmationComponent  implements OnInit{

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
       this.getOrderByCode(this.code).subscribe(
			(orderByCode: Order | undefined) => {
				this.orderByCode = orderByCode;
				console.log(this.orderByCode);
			}
		);	
    }
	
}
