import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressEditComponent } from './account-address-edit.component';

describe('AccountAddressEditComponent', () => {
  let component: AccountAddressEditComponent;
  let fixture: ComponentFixture<AccountAddressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAddressEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
