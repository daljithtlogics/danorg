import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalNetworkComponent } from './legal-network.component';

const routes: Routes = [
    {
		path:'',
		component:LegalNetworkComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalNetworkRoutingModule { }
