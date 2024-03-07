import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItCourseFilesComponent } from './it-course-files.component';

const routes: Routes = [
	{
		path: "",
		component: ItCourseFilesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItCourseFilesRoutingModule { }
