import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KinInfo } from './kin.component';
const routes: Routes = [
	{
		path:"",
		component:KinInfo
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KinInfoRoutingModule { }
