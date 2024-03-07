import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfographicReleaseThePressureComponent } from './infographic-release-the-pressure.component';

const routes: Routes = [
	{
		path:"",
		component:InfographicReleaseThePressureComponent	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfographicReleaseThePressureRoutingModule { }
