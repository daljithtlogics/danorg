import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelStatementComponent } from './travel-statement.component';

const routes: Routes = [
	{
		path: "",
		component: TravelStatementComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelStatementRoutingModule { }
