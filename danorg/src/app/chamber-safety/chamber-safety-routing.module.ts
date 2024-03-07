import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChamberSafetyComponent } from './chamber-safety.component';

const routes: Routes = [
	{
		path:'',
		component:ChamberSafetyComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamberSafetyRoutingModule { }
