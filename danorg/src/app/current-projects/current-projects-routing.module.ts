import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentProjectsComponent } from './current-projects.component';

const routes: Routes = [
	{
		path:"",
		component:CurrentProjectsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentProjectsRoutingModule { }
