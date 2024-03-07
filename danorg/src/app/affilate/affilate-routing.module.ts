import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffilateComponent } from './affilate.component';

const routes: Routes = [
	{
		path:"",
		component:AffilateComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffilateRoutingModule { }
