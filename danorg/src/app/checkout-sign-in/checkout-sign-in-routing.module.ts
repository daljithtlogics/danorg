import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutSignInComponent } from './checkout-sign-in.component';

const routes: Routes = [
	{
		path:'',
		component:CheckoutSignInComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutSignInRoutingModule { }
