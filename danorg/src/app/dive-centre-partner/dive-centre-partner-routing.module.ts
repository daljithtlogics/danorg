import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiveCentrePartnerComponent } from './dive-centre-partner.component';

const routes: Routes = [
	{
		path:'',
		component:DiveCentrePartnerComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiveCentrePartnerRoutingModule { }
