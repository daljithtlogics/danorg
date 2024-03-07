import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { AllproductsRoutingModule } from './allproducts-routing.module';
import { AllproductsComponent } from './allproducts.component';

@NgModule({
  declarations: [],
  providers: [DecimalPipe],
  imports: [
    CommonModule,
    AllproductsRoutingModule
  ]
})
export class AllproductsModule { }
