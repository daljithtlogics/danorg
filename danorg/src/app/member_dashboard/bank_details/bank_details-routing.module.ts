import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDetailsMember } from './bank_details.component';
const routes: Routes = [
	{
		path:"",
		component:BankDetailsMember
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankDetailsMemberRoutingModule { }
