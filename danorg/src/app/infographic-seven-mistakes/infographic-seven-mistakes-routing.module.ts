import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicSevenMistakesComponent } from './infographic-seven-mistakes.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicSevenMistakesComponent
	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicSevenMistakesRoutingModule { }
