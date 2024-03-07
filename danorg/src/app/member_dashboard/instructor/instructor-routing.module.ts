import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorMember } from './instructor.component';
const routes: Routes = [
	{
		path:"",
		component:InstructorMember
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorMemberRoutingModule { }
