import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveCentrePartnerApplicationComponent } from './dive-centre-partner-application.component';

describe('DiveCentrePartnerApplicationComponent', () => {
  let component: DiveCentrePartnerApplicationComponent;
  let fixture: ComponentFixture<DiveCentrePartnerApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveCentrePartnerApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveCentrePartnerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
