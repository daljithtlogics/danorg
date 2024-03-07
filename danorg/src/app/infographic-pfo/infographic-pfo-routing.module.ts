import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicPfoComponent } from './infographic-pfo.component';
const routes: Routes = [
	{
		path:"",
		component:InfographicPfoComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicPfoRoutingModule { }
