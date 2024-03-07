import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { DanshopHomeRoutingModule } from './danshop-home-routing.module';
import { DanshopHomeComponent } from './danshop-home.component';

@NgModule({
  declarations: [],
  providers: [DecimalPipe],
  imports: [
    CommonModule,
    DanshopHomeRoutingModule
  ]
})
export class DanshopHomeModule { }
