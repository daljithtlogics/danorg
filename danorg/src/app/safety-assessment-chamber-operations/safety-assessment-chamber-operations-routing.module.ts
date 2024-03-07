import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafetyAssessmentChamberOperationsComponent } from './safety-assessment-chamber-operations.component';

const routes: Routes = [
	{
		path:'',
		component:SafetyAssessmentChamberOperationsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafetyAssessmentChamberOperationsRoutingModule { }
