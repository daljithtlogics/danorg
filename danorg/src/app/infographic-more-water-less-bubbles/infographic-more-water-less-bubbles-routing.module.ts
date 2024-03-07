import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicMoreWaterLessBubblesComponent } from './infographic-more-water-less-bubbles.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicMoreWaterLessBubblesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicMoreWaterLessBubblesRoutingModule { }
