import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRenewalComponent } from './pay_renewal.component';

describe('PayRenewalComponent', () => {
  let component: PayRenewalComponent;
  let fixture: ComponentFixture<PayRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRenewalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
