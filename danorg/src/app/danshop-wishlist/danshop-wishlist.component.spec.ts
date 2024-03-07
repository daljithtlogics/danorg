import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopWishlistComponent } from './danshop-wishlist.component';

describe('DanshopWishlistComponent', () => {
  let component: DanshopWishlistComponent;
  let fixture: ComponentFixture<DanshopWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
