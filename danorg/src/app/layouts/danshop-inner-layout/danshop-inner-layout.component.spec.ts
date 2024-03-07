import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopInnerLayoutComponent } from './danshop-inner-layout.component';

describe('DanshopInnerLayoutComponent', () => {
  let component: DanshopInnerLayoutComponent;
  let fixture: ComponentFixture<DanshopInnerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopInnerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopInnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
