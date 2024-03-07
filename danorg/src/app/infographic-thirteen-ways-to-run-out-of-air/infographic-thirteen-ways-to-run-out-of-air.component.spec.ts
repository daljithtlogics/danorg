import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicThirteenWaysToRunOutOfAirComponent } from './infographic-thirteen-ways-to-run-out-of-air.component';

describe('InfographicThirteenWaysToRunOutOfAirComponent', () => {
  let component: InfographicThirteenWaysToRunOutOfAirComponent;
  let fixture: ComponentFixture<InfographicThirteenWaysToRunOutOfAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicThirteenWaysToRunOutOfAirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicThirteenWaysToRunOutOfAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
