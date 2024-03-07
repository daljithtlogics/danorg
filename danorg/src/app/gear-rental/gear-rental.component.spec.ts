import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearRentalComponent } from './gear-rental.component';

describe('GearRentalComponent', () => {
  let component: GearRentalComponent;
  let fixture: ComponentFixture<GearRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GearRentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
