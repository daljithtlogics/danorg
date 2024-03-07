import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipInfo } from './membership.component';

describe('MembershipInfo', () => {
  let component: MembershipInfo;
  let fixture: ComponentFixture<MembershipInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipInfo ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
