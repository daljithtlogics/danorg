import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDivingFamily } from './non_diving_family.component';

describe('NonDivingFamily', () => {
  let component: NonDivingFamily;
  let fixture: ComponentFixture<NonDivingFamily>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonDivingFamily ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonDivingFamily);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
