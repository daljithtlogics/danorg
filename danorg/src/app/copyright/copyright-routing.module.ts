import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopyrightComponent } from './copyright.component';

const routes: Routes = [
	{
		path: "",
		component: CopyrightComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopyrightRoutingModule { }
