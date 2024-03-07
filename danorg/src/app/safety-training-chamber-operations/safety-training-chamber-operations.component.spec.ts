import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyTrainingChamberOperationsComponent } from './safety-training-chamber-operations.component';

describe('SafetyTrainingChamberOperationsComponent', () => {
  let component: SafetyTrainingChamberOperationsComponent;
  let fixture: ComponentFixture<SafetyTrainingChamberOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyTrainingChamberOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyTrainingChamberOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
