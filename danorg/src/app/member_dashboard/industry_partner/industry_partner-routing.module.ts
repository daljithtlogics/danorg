import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryPartner } from './industry_partner.component';

const routes: Routes = [
	{
		path:"",
		component:IndustryPartner
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryPartnerRoutingModule { }
