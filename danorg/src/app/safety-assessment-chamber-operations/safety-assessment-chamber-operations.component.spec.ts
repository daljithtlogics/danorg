import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyAssessmentChamberOperationsComponent } from './safety-assessment-chamber-operations.component';

describe('SafetyAssessmentChamberOperationsComponent', () => {
  let component: SafetyAssessmentChamberOperationsComponent;
  let fixture: ComponentFixture<SafetyAssessmentChamberOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyAssessmentChamberOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyAssessmentChamberOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
