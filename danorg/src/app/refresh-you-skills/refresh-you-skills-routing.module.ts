import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefreshYouSkillsComponent } from './refresh-you-skills.component';

const routes: Routes = [
	{
		path:'',
		component:RefreshYouSkillsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefreshYouSkillsRoutingModule { }
