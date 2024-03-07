import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMemberAnnual } from './student_member_annual.component';

describe('StudentMemberAnnual', () => {
  let component: StudentMemberAnnual;
  let fixture: ComponentFixture<StudentMemberAnnual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMemberAnnual ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMemberAnnual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
