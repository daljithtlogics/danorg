import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafetyTrainingChamberOperationsComponent } from './safety-training-chamber-operations.component';

const routes: Routes = [
	{
		path:'',
		component:SafetyTrainingChamberOperationsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafetyTrainingChamberOperationsRoutingModule { }
