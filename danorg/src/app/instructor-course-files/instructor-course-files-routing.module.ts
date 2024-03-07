import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorCourseFilesComponent } from './instructor-course-files.component';

const routes: Routes = [
	{
		path:"",
		component:InstructorCourseFilesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorCourseFilesRoutingModule { }
