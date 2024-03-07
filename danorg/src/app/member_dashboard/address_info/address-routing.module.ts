import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressInfo } from './address.component';
const routes: Routes = [
	{
		path:"",
		component:AddressInfo
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressInfoRoutingModule { }
