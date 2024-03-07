import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonApplicationComponent } from './common-application.component';

describe('CommonApplicationComponent', () => {
  let component: CommonApplicationComponent;
  let fixture: ComponentFixture<CommonApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
