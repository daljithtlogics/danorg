import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCoursesComponent } from './provider-courses.component';

describe('ProviderCoursesComponent', () => {
  let component: ProviderCoursesComponent;
  let fixture: ComponentFixture<ProviderCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
