import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindADanInstructorComponent } from './find-a-dan-instructor.component';

const routes: Routes = [
	{
		path:"",
		component: FindADanInstructorComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindADanInstructorRoutingModule { }
