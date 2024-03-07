import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { gql, Apollo } from "apollo-angular";
import { map } from 'rxjs/operators';

import { StateService } from './state.service';
import { ActiveCustomerService } from './active-customer.service';

import { GET_ORDER_FOR_CHECKOUT } from './checkout-resolve.graphql';
import { Order, ActiveCustomer } from './types';

import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutShippingComponent } from './checkout-shipping/checkout-shipping.component';
import { CheckoutSignInComponent } from './checkout-sign-in/checkout-sign-in.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentRedirectComponent } from './checkout-payment-redirect/checkout-payment-redirect.component';

@Injectable({
	providedIn: 'root'
})

export class CheckoutGuard implements CanActivate {
  
  activeCustomer: ActiveCustomer | undefined;
  
  constructor(private router: Router, private stateService: StateService, private apollo: Apollo, private activeCustomerService: ActiveCustomerService) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {		
		const orderState$ =  this.apollo.query<{ activeOrder: Order }>({
			query: GET_ORDER_FOR_CHECKOUT,
			fetchPolicy: 'no-cache',
		}).pipe(
			map(result => result.data?.activeOrder ? result.data?.activeOrder.state : 'AddingItems'),
		);
		
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
		
		const signedIn$ = this.stateService.select(state => state.signedIn);
		return combineLatest(orderState$, signedIn$).pipe(
            map(([orderState, signedIn]) => {
                const component = route.component;

                if (component === CheckoutSignInComponent) {
                    if (signedIn) {
                        this.router.navigate(['/danshop/checkout', 'shipping']);
                        return false;
                    } else {
                        if (orderState === 'AddingItems') {
                            return true;
                        } else if (orderState === 'ArrangingPayment') {
                            this.router.navigate(['/danshop/checkout', 'payment']);
                            return false;
                        } else {
                            return false;
                        }
                    }
                } else if (component === CheckoutShippingComponent) {
                    if (orderState === 'AddingItems') {
                        return true;
                    } else if (orderState === 'ArrangingPayment') {
                        this.router.navigate(['/danshop/checkout', 'payment']);
                        return false;
                    } else {
                        return false;
                    }
                } else if (component === CheckoutPaymentComponent) {
                    if (orderState === 'ArrangingPayment') {
                        return true;
                    } else if (orderState === 'AddingItems') {
                        this.router.navigate(['/danshop/checkout']);
                        return false;
                    } else {
                        return false;
                    }
                } else if (component === CheckoutConfirmationComponent) {
                    return true;
                } else if (component === CheckoutPaymentRedirectComponent) {
                    return true;
                }
                return true;
            }),
        );
  }
  
}
