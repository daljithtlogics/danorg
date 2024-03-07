import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelNotificationComponent } from './travel-notification.component';

const routes: Routes = [
	{
		path:'',
		component:TravelNotificationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelNotificationRoutingModule { }
