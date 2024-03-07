import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopGiftCertificatesComponent } from './danshop-gift-certificates.component';

describe('DanshopGiftCertificatesComponent', () => {
  let component: DanshopGiftCertificatesComponent;
  let fixture: ComponentFixture<DanshopGiftCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopGiftCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopGiftCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
