import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternPackagesComponent } from './intern-packages.component';

const routes: Routes = [
	{
		path:"",
		component:InternPackagesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternPackagesRoutingModule { }
