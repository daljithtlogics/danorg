import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDriverComponent } from './alert-driver.component';

describe('AlertDriverComponent', () => {
  let component: AlertDriverComponent;
  let fixture: ComponentFixture<AlertDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
