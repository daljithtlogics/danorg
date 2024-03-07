import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveCentrePartnerClientRegistrationFormComponent } from './dive-centre-partner-client-registration-form.component';

describe('DiveCentrePartnerClientRegistrationFormComponent', () => {
  let component: DiveCentrePartnerClientRegistrationFormComponent;
  let fixture: ComponentFixture<DiveCentrePartnerClientRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveCentrePartnerClientRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveCentrePartnerClientRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
