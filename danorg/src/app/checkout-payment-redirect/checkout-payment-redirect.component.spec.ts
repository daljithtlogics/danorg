import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPaymentRedirectComponent } from './checkout-payment-redirect.component';

describe('CheckoutPaymentRedirectComponent', () => {
  let component: CheckoutPaymentRedirectComponent;
  let fixture: ComponentFixture<CheckoutPaymentRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPaymentRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
