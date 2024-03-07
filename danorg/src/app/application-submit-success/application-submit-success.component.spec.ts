import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSubmitSuccessComponent } from './application-submit-success.component';

describe('ApplicationSubmitSuccessComponent', () => {
  let component: ApplicationSubmitSuccessComponent;
  let fixture: ComponentFixture<ApplicationSubmitSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationSubmitSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationSubmitSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
