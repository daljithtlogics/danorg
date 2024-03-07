import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopContactUsComponent } from './danshop-contact-us.component';
const routes: Routes = [
	{
		path:'',
		component:DanshopContactUsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopContactUsRoutingModule { }
