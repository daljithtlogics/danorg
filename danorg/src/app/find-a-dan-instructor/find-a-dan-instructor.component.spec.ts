import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindADanInstructorComponent } from './find-a-dan-instructor.component';

describe('FindADanInstructorComponent', () => {
  let component: FindADanInstructorComponent;
  let fixture: ComponentFixture<FindADanInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindADanInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindADanInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
