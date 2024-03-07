import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineSeminarsComponent } from './online-seminars.component';
const routes: Routes = [
	{
		path:"",
		component:OnlineSeminarsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineSeminarsRoutingModule { }
