import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopPrivacyPolicyComponent } from './danshop-privacy-policy.component';

describe('DanshopPrivacyPolicyComponent', () => {
  let component: DanshopPrivacyPolicyComponent;
  let fixture: ComponentFixture<DanshopPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopPrivacyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
