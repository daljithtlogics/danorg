import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InstructorMemberRoutingModule } from './instructor-routing.module';
import { InstructorMember } from './instructor.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InstructorMemberRoutingModule
  ]
})
export class InstructorMemberModule { }
