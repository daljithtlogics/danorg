import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopMenuComponent } from './danshop-menu.component';

describe('DanshopMenuComponent', () => {
  let component: DanshopMenuComponent;
  let fixture: ComponentFixture<DanshopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
