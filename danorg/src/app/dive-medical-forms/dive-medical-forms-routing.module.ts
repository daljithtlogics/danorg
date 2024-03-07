import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiveMedicalFormsComponent } from './dive-medical-forms.component';

const routes: Routes = [
	{
		path:'',
		component:DiveMedicalFormsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiveMedicalFormsRoutingModule { }
