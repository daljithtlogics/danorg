import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSafelyComponent } from './travel-safely.component';

describe('TravelSafelyComponent', () => {
  let component: TravelSafelyComponent;
  let fixture: ComponentFixture<TravelSafelyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelSafelyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelSafelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
