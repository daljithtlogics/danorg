import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSignoutComponent } from './account-signout.component';

const routes: Routes = [
	{
		path:'',
		component:AccountSignoutComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSignoutRoutingModule { }
