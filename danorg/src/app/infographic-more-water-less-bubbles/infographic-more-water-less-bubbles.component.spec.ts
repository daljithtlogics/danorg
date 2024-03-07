import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicMoreWaterLessBubblesComponent } from './infographic-more-water-less-bubbles.component';

describe('InfographicMoreWaterLessBubblesComponent', () => {
  let component: InfographicMoreWaterLessBubblesComponent;
  let fixture: ComponentFixture<InfographicMoreWaterLessBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicMoreWaterLessBubblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicMoreWaterLessBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
