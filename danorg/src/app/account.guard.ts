import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StateService } from './state.service';
import { ActiveCustomerService } from './active-customer.service';
import { ActiveCustomer } from './types';
import { gql, Apollo } from "apollo-angular";
import { map, switchMap } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})

export class AccountGuard implements CanActivate {

  activeCustomer: ActiveCustomer | undefined
  
  constructor(private router: Router, private stateService: StateService, private apollo: Apollo, private activeCustomerService: ActiveCustomerService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.activeCustomerService.getActiveCustomer().pipe(
		map((activeCustomer: ActiveCustomer | undefined) => {
			if (activeCustomer !== null && activeCustomer !== undefined) {
				this.activeCustomer = activeCustomer;
				this.stateService.setState('signedIn', true);
				return true; // Allow access
			} else {
				// Handle the case when activeCustomer is null or undefined
				this.router.navigate(['/danshop/account/sign-in']);
				return false; // Deny access
			}
		})
    );
  }
}
