import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivingFamily } from './diving_family.component';

describe('DivingFamily', () => {
  let component: DivingFamily;
  let fixture: ComponentFixture<DivingFamily>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivingFamily ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivingFamily);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
