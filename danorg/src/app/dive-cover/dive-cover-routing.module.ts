import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiveCoverComponent } from './dive-cover.component';

const routes: Routes = [
	{
		path:"",
		component:DiveCoverComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiveCoverRoutingModule { }
