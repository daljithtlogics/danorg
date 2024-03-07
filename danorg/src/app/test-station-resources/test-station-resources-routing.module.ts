import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestStationResourcesComponent } from './test-station-resources.component';

const routes: Routes = [
	{
		path:"",
		component:TestStationResourcesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestStationResourcesRoutingModule { }
