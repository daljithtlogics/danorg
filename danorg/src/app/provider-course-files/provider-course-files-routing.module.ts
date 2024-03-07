import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderCourseFilesComponent } from './provider-course-files.component';


const routes: Routes = [
	{
		path:'',
		component: ProviderCourseFilesComponent
	}	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderCourseFilesRoutingModule { }
