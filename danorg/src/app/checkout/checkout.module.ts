import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';

import { CheckoutComponent } from './checkout.component';
import { CheckoutSignInComponent } from '../checkout-sign-in/checkout-sign-in.component'; 
import { CheckoutShippingComponent } from '../checkout-shipping/checkout-shipping.component'; 
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
