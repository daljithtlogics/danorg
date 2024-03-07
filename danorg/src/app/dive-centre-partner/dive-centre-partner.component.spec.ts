import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveCentrePartnerComponent } from './dive-centre-partner.component';

describe('DiveCentrePartnerComponent', () => {
  let component: DiveCentrePartnerComponent;
  let fixture: ComponentFixture<DiveCentrePartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveCentrePartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveCentrePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
