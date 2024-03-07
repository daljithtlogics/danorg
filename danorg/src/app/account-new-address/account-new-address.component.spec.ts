import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewAddressComponent } from './account-new-address.component';

describe('AccountNewAddressComponent', () => {
  let component: AccountNewAddressComponent;
  let fixture: ComponentFixture<AccountNewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNewAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
