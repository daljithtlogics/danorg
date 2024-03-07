import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopMemberInformationComponent } from './danshop-member-information.component';

const routes: Routes = [
	{
		path:'',
		component:DanshopMemberInformationComponent 
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopMemberInformationRoutingModule { }
