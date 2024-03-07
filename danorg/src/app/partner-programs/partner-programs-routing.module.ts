import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerProgramsComponent } from './partner-programs.component';;

const routes: Routes = [
	{
		path: "",
		component: PartnerProgramsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerProgramsRoutingModule { }
