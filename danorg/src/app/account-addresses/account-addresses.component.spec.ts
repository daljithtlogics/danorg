import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressesComponent } from './account-addresses.component';

describe('AccountAddressesComponent', () => {
  let component: AccountAddressesComponent;
  let fixture: ComponentFixture<AccountAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
