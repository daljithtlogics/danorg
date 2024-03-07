import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelSafelyComponent } from './travel-safely.component';

const routes: Routes = [
	{
		path:'',
		component:TravelSafelyComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelSafelyRoutingModule { }
