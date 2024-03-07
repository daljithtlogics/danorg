import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [],
  providers: [DecimalPipe],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
