import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternationalDanComponent } from './international-dan.component'

const routes: Routes = [
	{
		path: '',
		component: InternationalDanComponent
	}	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternationalDanRoutingModule { }
