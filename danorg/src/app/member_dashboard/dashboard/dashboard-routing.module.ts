import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './dashboard.component';
const routes: Routes = [
	{
		path:"",
		component:LoginDashboardComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginDashboardRoutingModule { }
