import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
	FormsModule
  ]
})
export class ProductDetailsModule { }
