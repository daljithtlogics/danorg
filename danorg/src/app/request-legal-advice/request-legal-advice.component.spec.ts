import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLegalAdviceComponent } from './request-legal-advice.component';

describe('RequestLegalAdviceComponent', () => {
  let component: RequestLegalAdviceComponent;
  let fixture: ComponentFixture<RequestLegalAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLegalAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestLegalAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
