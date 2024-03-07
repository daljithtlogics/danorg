import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicSafetyInTheAirComponent } from './infographic-safety-in-the-air.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicSafetyInTheAirComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicSafetyInTheAirRoutingModule { }
