import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSigninComponent } from './account-signin/account-signin.component'; 

const routes: Routes = [
	{
		path:'',
		component:AccountSigninComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSigninRoutingModule { }
