import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestLegalAdviceComponent } from './request-legal-advice.component';

const routes: Routes = [
    {
		path:'',
		component:RequestLegalAdviceComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestLegalAdviceRoutingModule { }
