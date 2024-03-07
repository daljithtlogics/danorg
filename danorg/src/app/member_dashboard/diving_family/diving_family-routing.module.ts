import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivingFamily } from './diving_family.component';

const routes: Routes = [
	{
		path:"",
		component:DivingFamily
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivingFamilyRoutingModule { }
