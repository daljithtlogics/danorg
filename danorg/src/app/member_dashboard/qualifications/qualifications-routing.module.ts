import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualificationsMember } from './qualifications.component';
const routes: Routes = [
	{
		path:"",
		component:QualificationsMember
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualificationsMemberRoutingModule { }
