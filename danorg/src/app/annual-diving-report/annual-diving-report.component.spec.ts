import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualDivingReportComponent } from './annual-diving-report.component';

describe('AnnualDivingReportComponent', () => {
  let component: AnnualDivingReportComponent;
  let fixture: ComponentFixture<AnnualDivingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualDivingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualDivingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
