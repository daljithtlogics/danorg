import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearRentalComponent } from './gear-rental.component';

const routes: Routes = [
	{
		path:'',
		component:GearRentalComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GearRentalRoutingModule { }
