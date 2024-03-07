import { NgModule } from '@angular/core';			
import { RouterModule, Routes } from '@angular/router';
import { DiveCentrePartner } from './dive-centre-partner.component';
			
const routes: Routes = [
	{
		path:"",
		component:DiveCentrePartner
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiveCentrePartnerRoutingModule { }
