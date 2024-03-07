import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiveCentrePartnerApplicationComponent } from './dive-centre-partner-application.component';

const routes: Routes = [
	{
		path:'',
		component:DiveCentrePartnerApplicationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiveCentrePartnerApplicationRoutingModule { }
