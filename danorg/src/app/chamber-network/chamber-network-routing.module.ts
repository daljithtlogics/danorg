import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamberNetworkComponent } from './chamber-network.component';

const routes: Routes = [
	{
		path:"",
		component:ChamberNetworkComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamberNetworkRoutingModule { }
