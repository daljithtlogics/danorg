import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentApplicationComponent } from './student-application.component';

const routes: Routes = [
	{
		path:"",
		component:StudentApplicationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentApplicationRoutingModule { }
