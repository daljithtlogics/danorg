import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountNewAddressComponent } from './account-new-address.component';

const routes: Routes = [
	{
		path:'',
		component: AccountNewAddressComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountNewAddressRoutingModule { }
