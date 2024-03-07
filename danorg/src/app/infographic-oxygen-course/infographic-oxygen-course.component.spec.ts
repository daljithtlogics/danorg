import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicOxygenCourseComponent } from './infographic-oxygen-course.component';

describe('InfographicOxygenCourseComponent', () => {
  let component: InfographicOxygenCourseComponent;
  let fixture: ComponentFixture<InfographicOxygenCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicOxygenCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicOxygenCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
