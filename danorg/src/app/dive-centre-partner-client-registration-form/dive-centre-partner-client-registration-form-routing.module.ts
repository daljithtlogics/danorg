import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiveCentrePartnerClientRegistrationFormComponent } from './dive-centre-partner-client-registration-form.component';

const routes: Routes = [
	{
		path:'',
		component:DiveCentrePartnerClientRegistrationFormComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiveCentrePartnerClientRegistrationFormRoutingModule { }
