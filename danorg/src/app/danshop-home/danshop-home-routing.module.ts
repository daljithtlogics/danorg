import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopHomeComponent } from './danshop-home.component';

const routes: Routes = [
	{
		path: '',
		component: DanshopHomeComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopHomeRoutingModule { }
