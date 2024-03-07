import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorMember } from './instructor.component';

describe('InstructorMember', () => {
  let component: InstructorMember;
  let fixture: ComponentFixture<InstructorMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorMember ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
