import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfo } from './address.component';

describe('AddressInfo', () => {
  let component: AddressInfo;
  let fixture: ComponentFixture<AddressInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressInfo ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
