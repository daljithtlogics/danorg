import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InfographicTempMembershipComponent } from './infographic-temp-membership.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicTempMembershipComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicTempMembershipRoutingModule { }
