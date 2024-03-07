import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderMember } from './provider.component';
const routes: Routes = [
	{
		path:"",
		component:ProviderMember
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderMemberRoutingModule { }
