import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryPartnerApplicationComponent } from './industry-partner-application.component';

describe('IndustryPartnerApplicationComponent', () => {
  let component: IndustryPartnerApplicationComponent;
  let fixture: ComponentFixture<IndustryPartnerApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryPartnerApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryPartnerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
