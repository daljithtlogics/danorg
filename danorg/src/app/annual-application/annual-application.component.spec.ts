import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualApplicationComponent } from './annual-application.component';

describe('AnnualApplicationComponent', () => {
  let component: AnnualApplicationComponent;
  let fixture: ComponentFixture<AnnualApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
