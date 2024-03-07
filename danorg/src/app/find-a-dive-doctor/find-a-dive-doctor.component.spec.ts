import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindADiveDoctorComponent } from './find-a-dive-doctor.component';

describe('FindADiveDoctorComponent', () => {
  let component: FindADiveDoctorComponent;
  let fixture: ComponentFixture<FindADiveDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindADiveDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindADiveDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
