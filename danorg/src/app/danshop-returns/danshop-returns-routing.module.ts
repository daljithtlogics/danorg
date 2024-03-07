import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopReturnsComponent } from './danshop-returns.component';

const routes: Routes = [
	{
		path:"",
		component:DanshopReturnsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopReturnsRoutingModule { }
