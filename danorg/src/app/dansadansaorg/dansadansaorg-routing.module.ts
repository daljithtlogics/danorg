import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DansadansaorgComponent } from './dansadansaorg.component';

const routes: Routes = [
	{
		path:"",
		component:DansadansaorgComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DansadansaorgRoutingModule { }
