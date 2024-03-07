import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopAboutComponent } from './danshop-about.component';

const routes: Routes = [
	{
		path:'',
		component:DanshopAboutComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopAboutRoutingModule { }
