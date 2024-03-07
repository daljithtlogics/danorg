import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicStudentComponent } from './infographic-student.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicStudentComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicStudentRoutingModule { }
