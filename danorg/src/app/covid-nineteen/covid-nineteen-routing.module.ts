import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidNineteenComponent } from './covid-nineteen.component';

const routes: Routes = [
	{
		path: '',
		component: CovidNineteenComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidNineteenRoutingModule { }
