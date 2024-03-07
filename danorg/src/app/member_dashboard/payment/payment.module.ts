import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PaymentComponentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';       

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentComponentRoutingModule  
  ]
})
export class PaymentComponentModule { }
