import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopDeliveryShippingComponent } from './danshop-delivery-shipping.component';

describe('DanshopDeliveryShippingComponent', () => {
  let component: DanshopDeliveryShippingComponent;
  let fixture: ComponentFixture<DanshopDeliveryShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopDeliveryShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopDeliveryShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
