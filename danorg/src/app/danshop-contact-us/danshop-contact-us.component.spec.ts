import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopContactUsComponent } from './danshop-contact-us.component';

describe('DanshopContactUsComponent', () => {
  let component: DanshopContactUsComponent;
  let fixture: ComponentFixture<DanshopContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
