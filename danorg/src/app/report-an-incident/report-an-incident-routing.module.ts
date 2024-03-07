import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportIncidentComponent } from './report-an-incident.component';

const routes: Routes = [
	{
		path:"",
		component:ReportIncidentComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportIncidentRoutingModule { }
