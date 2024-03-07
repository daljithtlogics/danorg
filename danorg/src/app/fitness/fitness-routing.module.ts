import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FitnessComponent } from './fitness.component';

const routes: Routes = [
	{
		path:'',
		component:FitnessComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitnessRoutingModule { }
