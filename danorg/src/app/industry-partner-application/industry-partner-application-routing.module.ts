import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryPartnerApplicationComponent } from './industry-partner-application.component';

const routes: Routes = [
	{
		path:"",
		component: IndustryPartnerApplicationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryPartnerApplicationRoutingModule { }
