import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnualFreediverComponent } from './annual-freediver.component';

const routes: Routes = [
	{
		path:"",
		component:AnnualFreediverComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualFreediverRoutingModule { }
