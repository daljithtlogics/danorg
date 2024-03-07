import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnualDivingReportComponent } from './annual-diving-report.component';

const routes: Routes = [
	{
		path:'',
		component:AnnualDivingReportComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualDivingReportRoutingModule { }
