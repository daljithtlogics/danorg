import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopPrivacyPolicyComponent } from './danshop-privacy-policy.component';

const routes: Routes = [
	{
		path:'',
		component:DanshopPrivacyPolicyComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopPrivacyPolicyRoutingModule { }
