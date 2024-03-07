import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorCoursesComponent } from './instructor-courses.component';

const routes: Routes = [
	{
		path:'',
		component:InstructorCoursesComponent
	}	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorCoursesRoutingModule { }
