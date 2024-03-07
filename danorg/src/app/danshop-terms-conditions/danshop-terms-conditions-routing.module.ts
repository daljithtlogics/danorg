import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopTermsConditionsComponent } from './danshop-terms-conditions.component';

const routes: Routes = [
	{
		path:'',
		component:DanshopTermsConditionsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopTermsConditionsRoutingModule { }
