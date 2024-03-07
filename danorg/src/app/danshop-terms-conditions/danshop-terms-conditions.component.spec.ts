import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopTermsConditionsComponent } from './danshop-terms-conditions.component';

describe('DanshopTermsConditionsComponent', () => {
  let component: DanshopTermsConditionsComponent;
  let fixture: ComponentFixture<DanshopTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopTermsConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
