import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountSignoutComponent } from '../account-signout/account-signout.component'; 
import { AccountDashboardComponent } from '../account-dashboard/account-dashboard.component'; 
import { AccountOrdersComponent } from '../account-orders/account-orders.component'; 
import { AccountOrderDetailComponent } from '../account-order-detail/account-order-detail.component'; 
import { AccountAddressesComponent } from '../account-addresses/account-addresses.component'; 
import { AccountAddressEditComponent } from '../account-address-edit/account-address-edit.component'; 
import { AccountPersonalDetailsComponent } from '../account-personal-details/account-personal-details.component'; 
import { AccountChangePasswordComponent } from '../account-change-password/account-change-password.component'; 
import { AccountNewAddressComponent } from '../account-new-address/account-new-address.component';

import { AccountSigninComponent } from '../account-signin/account-signin.component'; 
import { AccountRegisterComponent } from '../account-register/account-register.component'; 
import { AccountForgotPasswordComponent } from '../account-forgot-password/account-forgot-password.component'; 
import { ResetPasswordComponent } from '../reset-password/reset-password.component'; 
import { AccountGuard } from '../account.guard';
import { SigninGuard } from '../signin.guard';

const routes: Routes = [
    {
		path:'',
		component: AccountComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: AccountDashboardComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'orders',
				pathMatch: 'full',
				component: AccountOrdersComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'orders/:page',
				component: AccountOrdersComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'order-details/:code',
				pathMatch: 'full',
				component: AccountOrderDetailComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'addresses',
				pathMatch: 'full',
				component: AccountAddressesComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'new-address',
				pathMatch: 'full',
				component: AccountNewAddressComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'address-edit/:id',
				pathMatch: 'full',
				component: AccountAddressEditComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'personal-details',
				pathMatch: 'full',
				component: AccountPersonalDetailsComponent,
				canActivate: [AccountGuard],
			},
			{
				path: 'change-password',
				pathMatch: 'full',
				component: AccountChangePasswordComponent,
				canActivate: [AccountGuard],
			},			
			{
				path: 'signout',
				pathMatch: 'full',
				component: AccountSignoutComponent,	
				
			},
            {
                path: 'sign-in',
                component: AccountSigninComponent,
				canActivate: [SigninGuard],
            },
            {
                path: 'register',
                component: AccountRegisterComponent,
				canActivate: [SigninGuard],
            },
            {
                path: 'forgot-password',
                component: AccountForgotPasswordComponent,
				canActivate: [SigninGuard],
            },
			{
                path: 'password-reset',
                component: ResetPasswordComponent,
				canActivate: [SigninGuard],
            }
			
		]
	}
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
