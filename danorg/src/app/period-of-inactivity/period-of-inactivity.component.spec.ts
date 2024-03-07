import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodOfInactivityComponent } from './period-of-inactivity.component';

describe('PeriodOfInactivityComponent', () => {
  let component: PeriodOfInactivityComponent;
  let fixture: ComponentFixture<PeriodOfInactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodOfInactivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodOfInactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
