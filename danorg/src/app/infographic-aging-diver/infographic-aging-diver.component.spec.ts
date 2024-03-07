import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicAgingDiverComponent } from './infographic-aging-diver.component';

describe('InfographicAgingDiverComponent', () => {
  let component: InfographicAgingDiverComponent;
  let fixture: ComponentFixture<InfographicAgingDiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicAgingDiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicAgingDiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
