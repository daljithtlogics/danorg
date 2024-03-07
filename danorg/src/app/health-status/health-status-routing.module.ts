import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthStatusComponent } from './health-status.component';

const routes: Routes = [
	{
		path:'',
		component:HealthStatusComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthStatusRoutingModule { }
