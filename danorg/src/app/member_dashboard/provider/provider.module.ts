import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProviderMemberRoutingModule } from './provider-routing.module';
import { ProviderMember } from './provider.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProviderMemberRoutingModule
  ]
})
export class ProviderMemberModule { }
