import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeMemberAnnual } from './upgrade_member_annual.component';

describe('UpgradeMemberAnnual', () => {
  let component: UpgradeMemberAnnual;
  let fixture: ComponentFixture<UpgradeMemberAnnual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeMemberAnnual ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeMemberAnnual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
