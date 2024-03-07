import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMember } from './profile.component';
const routes: Routes = [
	{
		path:"",
		component:ProfileMember
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileMemberRoutingModule { }
