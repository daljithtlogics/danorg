import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MalariaComponent } from './malaria.component';

const routes: Routes = [
	{
		path:"",
		component:MalariaComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MalariaRoutingModule { }
