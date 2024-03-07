import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonApplicationComponent } from './common-application.component';

const routes: Routes = [
	{
		path:"",
		component:CommonApplicationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonApplicationRoutingModule { }
