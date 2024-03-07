import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfo } from './personal.component';
const routes: Routes = [
	{
		path:"",
		component:PersonalInfo
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInfoRoutingModule { }
