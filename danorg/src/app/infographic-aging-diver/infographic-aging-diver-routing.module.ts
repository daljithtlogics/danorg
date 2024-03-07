import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicAgingDiverComponent } from './infographic-aging-diver.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicAgingDiverComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicAgingDiverRoutingModule { }
