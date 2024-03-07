import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopWishlistComponent } from './danshop-wishlist.component';

const routes: Routes = [
	{
		path:"",
		component:DanshopWishlistComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopWishlistRoutingModule { }
