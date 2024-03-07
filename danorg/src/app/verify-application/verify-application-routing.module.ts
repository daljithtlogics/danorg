import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyApplicationComponent } from './verify-application.component';

const routes: Routes = [
	{
		path:"",
		component:VerifyApplicationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyApplicationRoutingModule { }
