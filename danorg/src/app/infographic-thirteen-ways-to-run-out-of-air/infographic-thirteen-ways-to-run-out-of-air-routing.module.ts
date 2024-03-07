import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicThirteenWaysToRunOutOfAirComponent } from './infographic-thirteen-ways-to-run-out-of-air.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicThirteenWaysToRunOutOfAirComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicThirteenWaysToRunOutOfAirRoutingModule { }
