import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopDeliveryShippingComponent } from './danshop-delivery-shipping.component';
const routes: Routes = [
	{
		path:'',
		component:DanshopDeliveryShippingComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopDeliveryShippingRoutingModule { }
