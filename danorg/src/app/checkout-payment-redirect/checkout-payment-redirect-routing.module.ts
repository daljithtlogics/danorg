import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPaymentRedirectComponent } from './checkout-payment-redirect.component';

const routes: Routes = [
	path: "",
	component: CheckoutPaymentRedirectComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPaymentRedirectRoutingModule { }
