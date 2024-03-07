import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationalSafetyResourcesComponent } from './operational-safety-resources.component';

const routes: Routes = [
	{
		path:'',
		component:OperationalSafetyResourcesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationalSafetyResourcesRoutingModule { }
