import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutConfirmationComponent } from './checkout-confirmation.component';

const routes: Routes = [
  {
	  path: '',
	  component: CheckoutConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutConfirmationRoutingModule { }