import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopLayoutComponent } from './danshop-layout.component';

describe('DanshopLayoutComponent', () => {
  let component: DanshopLayoutComponent;
  let fixture: ComponentFixture<DanshopLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
