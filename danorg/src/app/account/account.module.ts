import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountSignoutComponent } from '../account-signout/account-signout.component'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
