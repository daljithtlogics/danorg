import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicDiabetesComponent } from './infographic-diabetes.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicDiabetesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicDiabetesRoutingModule { }
