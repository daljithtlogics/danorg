import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoPolicyComponent } from './logo-policy.component';

const routes: Routes = [
	{
		path:"",
		component: LogoPolicyComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoPolicyRoutingModule { }
