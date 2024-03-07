import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiraProgramComponent } from './hira-program.component';

const routes: Routes = [
	{
		path:"",
		component:HiraProgramComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiraProgramRoutingModule { }
