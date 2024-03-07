import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyApplicationComponent } from './verify-application.component';

describe('VerifyApplicationComponent', () => {
  let component: VerifyApplicationComponent;
  let fixture: ComponentFixture<VerifyApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
