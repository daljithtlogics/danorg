import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationSurveyComponent } from './cancellation-survey.component';

describe('CancellationSurveyComponent', () => {
  let component: CancellationSurveyComponent;
  let fixture: ComponentFixture<CancellationSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
