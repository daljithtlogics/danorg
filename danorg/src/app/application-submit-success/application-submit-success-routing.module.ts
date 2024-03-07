import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationSubmitSuccessComponent } from './application-submit-success.component';

const routes: Routes = [
	{
		path:"",
		component:ApplicationSubmitSuccessComponent
	}	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationSubmitSuccessRoutingModule { }
