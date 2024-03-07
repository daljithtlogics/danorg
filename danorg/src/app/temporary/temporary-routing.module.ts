import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemporaryComponent } from './temporary.component';

const routes: Routes = [
	{
		path:"",
		component:TemporaryComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemporaryRoutingModule { }
