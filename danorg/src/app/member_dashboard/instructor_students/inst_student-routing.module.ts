import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorStudent } from './inst_student.component';
const routes: Routes = [
	{
		path:"",
		component:InstructorStudent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorStudentRoutingModule { }
