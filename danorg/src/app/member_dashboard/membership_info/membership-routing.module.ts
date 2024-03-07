import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipInfo } from './membership.component';
const routes: Routes = [
	{
		path:"",
		component:MembershipInfo
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipInfoRoutingModule { }
