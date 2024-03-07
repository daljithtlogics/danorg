import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicAnnualMembershipComponent } from './infographic-annual-membership.component';

describe('InfographicAnnualMembershipComponent', () => {
  let component: InfographicAnnualMembershipComponent;
  let fixture: ComponentFixture<InfographicAnnualMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicAnnualMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicAnnualMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
