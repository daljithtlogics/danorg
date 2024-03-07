import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicLostAtSeaComponent } from './infographic-lost-at-sea.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicLostAtSeaComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicLostAtSeaRoutingModule { }
