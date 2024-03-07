import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelNotificationThankYouComponent } from './travel-notification-thank-you.component';

const routes: Routes = [
	{
		path:'',
		component:TravelNotificationThankYouComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelNotificationThankYouRoutingModule { }
