import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOrdersComponent } from './account-orders.component';

const routes: Routes = [
	{
		path:"",
		component:AccountOrdersComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOrdersRoutingModule { }
