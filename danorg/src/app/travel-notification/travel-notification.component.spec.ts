import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNotificationComponent } from './travel-notification.component';

describe('TravelNotificationComponent', () => {
  let component: TravelNotificationComponent;
  let fixture: ComponentFixture<TravelNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
