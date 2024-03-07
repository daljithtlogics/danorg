import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopInnerHeaderComponent } from './danshop-inner-header.component';

describe('DanshopInnerHeaderComponent', () => {
  let component: DanshopInnerHeaderComponent;
  let fixture: ComponentFixture<DanshopInnerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopInnerHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopInnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
