import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonDivingFamily } from './non_diving_family.component';
const routes: Routes = [
	{
		path:"",
		component:NonDivingFamily
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonDivingFamilyRoutingModule { }
