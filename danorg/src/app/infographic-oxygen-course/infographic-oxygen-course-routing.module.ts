import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicOxygenCourseComponent } from './infographic-oxygen-course.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicOxygenCourseComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicOxygenCourseRoutingModule { }
