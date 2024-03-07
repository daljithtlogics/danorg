import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopSearchComponent } from './danshop-search.component';

const routes: Routes = [
	{
		path:"",
		component:DanshopSearchComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopSearchRoutingModule { }
