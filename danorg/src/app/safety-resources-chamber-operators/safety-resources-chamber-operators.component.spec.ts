import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyResourcesChamberOperatorsComponent } from './safety-resources-chamber-operators.component';

describe('SafetyResourcesChamberOperatorsComponent', () => {
  let component: SafetyResourcesChamberOperatorsComponent;
  let fixture: ComponentFixture<SafetyResourcesChamberOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyResourcesChamberOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyResourcesChamberOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
