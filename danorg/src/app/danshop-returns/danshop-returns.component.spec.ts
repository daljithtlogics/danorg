import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopReturnsComponent } from './danshop-returns.component';

describe('DanshopReturnsComponent', () => {
  let component: DanshopReturnsComponent;
  let fixture: ComponentFixture<DanshopReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
