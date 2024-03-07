import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationSurveyComponent } from './cancellation-survey.component';

const routes: Routes = [
	{
		path:"",
		component:CancellationSurveyComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancellationSurveyRoutingModule { }
