import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualComponent } from './annual.component';
const routes: Routes = [
	{
		path:"",
		component:AnnualComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualRoutingModule { }
