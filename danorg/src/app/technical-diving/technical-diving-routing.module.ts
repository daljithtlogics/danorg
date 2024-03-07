import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TechnicalDivingComponent } from './technical-diving.component';

const routes: Routes = [
	{
		path:"",
		component:TechnicalDivingComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalDivingRoutingModule { }
