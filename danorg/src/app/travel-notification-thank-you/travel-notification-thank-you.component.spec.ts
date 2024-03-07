import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNotificationThankYouComponent } from './travel-notification-thank-you.component';

describe('TravelNotificationThankYouComponent', () => {
  let component: TravelNotificationThankYouComponent;
  let fixture: ComponentFixture<TravelNotificationThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelNotificationThankYouComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelNotificationThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
