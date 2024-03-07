import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayRenewalComponent } from './pay_renewal.component';					
const routes: Routes = [
	{
		path:"",
		component:PayRenewalComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRenewalComponentRoutingModule { }				
