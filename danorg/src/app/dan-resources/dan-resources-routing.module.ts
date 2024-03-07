import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DanResourcesComponent } from './dan-resources.component';

const routes: Routes = [
    {
		path:'',
		component:DanResourcesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanResourcesRoutingModule { }
