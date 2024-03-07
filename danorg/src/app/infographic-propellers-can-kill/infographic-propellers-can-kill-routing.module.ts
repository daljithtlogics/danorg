import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicPropellersCanKillComponent } from './infographic-propellers-can-kill.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicPropellersCanKillComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicPropellersCanKillRoutingModule { }
