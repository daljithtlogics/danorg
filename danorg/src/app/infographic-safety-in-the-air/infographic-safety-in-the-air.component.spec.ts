import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicSafetyInTheAirComponent } from './infographic-safety-in-the-air.component';

describe('InfographicSafetyInTheAirComponent', () => {
  let component: InfographicSafetyInTheAirComponent;
  let fixture: ComponentFixture<InfographicSafetyInTheAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicSafetyInTheAirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicSafetyInTheAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
