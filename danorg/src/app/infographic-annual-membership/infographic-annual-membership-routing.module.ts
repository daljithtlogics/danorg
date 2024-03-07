import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicAnnualMembershipComponent } from './infographic-annual-membership.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicAnnualMembershipComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicAnnualMembershipRoutingModule { }
