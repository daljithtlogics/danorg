import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPaymentComponent } from './checkout-payment.component';

const routes: Routes = [
	{
		path:"",
		component:CheckoutPaymentComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPaymentRoutingModule { }
