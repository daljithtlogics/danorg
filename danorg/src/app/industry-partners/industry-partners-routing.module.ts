import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryPartnersComponent } from './industry-partners.component';

const routes: Routes = [
	{
		path:"",
		component: IndustryPartnersComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryPartnersRoutingModule { }
