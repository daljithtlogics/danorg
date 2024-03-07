import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopSitemapComponent } from './danshop-sitemap.component';

const routes: Routes = [
	{
		path:"",
		component:DanshopSitemapComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopSitemapRoutingModule { }
