import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCourseFilesComponent } from './provider-course-files.component';

describe('ProviderCourseFilesComponent', () => {
  let component: ProviderCourseFilesComponent;
  let fixture: ComponentFixture<ProviderCourseFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderCourseFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderCourseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
