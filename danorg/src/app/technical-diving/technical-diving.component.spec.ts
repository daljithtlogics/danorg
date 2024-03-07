import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDivingComponent } from './technical-diving.component';

describe('TechnicalDivingComponent', () => {
  let component: TechnicalDivingComponent;
  let fixture: ComponentFixture<TechnicalDivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalDivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalDivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
