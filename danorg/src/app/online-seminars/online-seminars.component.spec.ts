import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineSeminarsComponent } from './online-seminars.component';

describe('OnlineSeminarsComponent', () => {
  let component: OnlineSeminarsComponent;
  let fixture: ComponentFixture<OnlineSeminarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineSeminarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineSeminarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
