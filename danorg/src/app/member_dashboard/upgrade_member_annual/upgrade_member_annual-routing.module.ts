import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeMemberAnnual } from './upgrade_member_annual.component';
const routes: Routes = [
	{
		path:"",
		component:UpgradeMemberAnnual
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpgradeMemberAnnualRoutingModule { }
