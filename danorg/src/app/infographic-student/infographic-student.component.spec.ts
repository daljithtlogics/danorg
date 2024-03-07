import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicStudentComponent } from './infographic-student.component';

describe('InfographicStudentComponent', () => {
  let component: InfographicStudentComponent;
  let fixture: ComponentFixture<InfographicStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
