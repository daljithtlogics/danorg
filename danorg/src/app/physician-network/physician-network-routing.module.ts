import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicianNetworkComponent } from './physician-network.component';

const routes: Routes = [
	{
		path:"",
		component:PhysicianNetworkComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianNetworkRoutingModule { }
