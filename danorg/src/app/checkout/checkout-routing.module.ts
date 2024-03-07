import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutGuard } from '../checkout.guard';

import { CheckoutSignInComponent } from '../checkout-sign-in/checkout-sign-in.component'; 
import { CheckoutShippingComponent } from '../checkout-shipping/checkout-shipping.component'; 
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component'; 
import { CheckoutConfirmationComponent } from '../checkout-confirmation/checkout-confirmation.component'; 
import { CheckoutPaymentRedirectComponent } from '../checkout-payment-redirect/checkout-payment-redirect.component'; 

const routes: Routes = [
	{
		path: "",
		component: CheckoutComponent,
		children: [
		    {
                path: '',
                pathMatch: 'full',
                component: CheckoutSignInComponent,
				canActivate: [CheckoutGuard],
            },
			{
				path: "shipping",
				pathMatch: 'full',
				component: CheckoutShippingComponent,
				canActivate: [CheckoutGuard],
			},
			{
				path: "payment",
				pathMatch: 'full',
				component: CheckoutPaymentComponent,
				canActivate: [CheckoutGuard],
			},
			{
                path: 'confirmation/:code',
                component: CheckoutConfirmationComponent,
                canActivate: [CheckoutGuard],
            },
			{
                path: 'payment-redirect',
                component: CheckoutPaymentRedirectComponent,
                canActivate: [CheckoutGuard],
            },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
