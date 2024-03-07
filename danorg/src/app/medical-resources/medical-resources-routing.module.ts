import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalResourcesComponent } from './medical-resources.component';

const routes: Routes = [
	{
		path:"",
		component:MedicalResourcesComponent
	}	
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalResourcesRoutingModule { }
