import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicTempMembershipComponent } from './infographic-temp-membership.component';

describe('InfographicTempMembershipComponent', () => {
  let component: InfographicTempMembershipComponent;
  let fixture: ComponentFixture<InfographicTempMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicTempMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicTempMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
