import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertDriverComponent } from './alert-driver.component';

const routes: Routes = [
	{
		path: '',
		component: AlertDriverComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertDriverRoutingModule { }
