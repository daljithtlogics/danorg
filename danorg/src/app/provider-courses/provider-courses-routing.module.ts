import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderCoursesComponent } from './provider-courses.component';

const routes: Routes = [
	{
		path:"",
		component:ProviderCoursesComponent
	}	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderCoursesRoutingModule { }
