import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseFilesComponent } from './instructor-course-files.component';

describe('InstructorCourseFilesComponent', () => {
  let component: InstructorCourseFilesComponent;
  let fixture: ComponentFixture<InstructorCourseFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCourseFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCourseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
