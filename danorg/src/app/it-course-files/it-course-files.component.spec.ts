import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItCourseFilesComponent } from './it-course-files.component';

describe('ItCourseFilesComponent', () => {
  let component: ItCourseFilesComponent;
  let fixture: ComponentFixture<ItCourseFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItCourseFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItCourseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
