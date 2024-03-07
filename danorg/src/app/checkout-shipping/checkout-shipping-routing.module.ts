import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutShippingComponent } from './checkout-shipping.component';

const routes: Routes = [
	{
		path: '',
		component: CheckoutShippingComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CheckoutShippingRoutingModule { }
