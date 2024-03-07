import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebinarsComponent } from './webinars.component';

const routes: Routes = [
	{
		path:"",
		component:WebinarsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarsRoutingModule { }
