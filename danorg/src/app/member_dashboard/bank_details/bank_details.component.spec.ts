import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailsMember } from './bank_details.component';

describe('BankDetailsMember', () => {
  let component: BankDetailsMember;
  let fixture: ComponentFixture<BankDetailsMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDetailsMember ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDetailsMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
