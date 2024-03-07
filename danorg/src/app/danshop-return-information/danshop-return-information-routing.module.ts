import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopReturnInformationComponent } from './danshop-return-information.component';

const routes: Routes = [
	{
		path:'',
		component:DanshopReturnInformationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopReturnInformationRoutingModule { }
