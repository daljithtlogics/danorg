import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentMemberAnnual } from './student_member_annual.component';
const routes: Routes = [
	{
		path:"",
		component:StudentMemberAnnual
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentMemberAnnualRoutingModule { }
