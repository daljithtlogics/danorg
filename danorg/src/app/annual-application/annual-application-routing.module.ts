import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualApplicationComponent } from './annual-application.component';

const routes: Routes = [
	{
		path:"",
		component:AnnualApplicationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualApplicationRoutingModule { }
