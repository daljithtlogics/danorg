import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicBasicLifeSupportComponent } from './infographic-basic-life-support.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicBasicLifeSupportComponent	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicBasicLifeSupportRoutingModule { }
