import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopHomeComponent } from './danshop-home.component';

describe('DanshopHomeComponent', () => {
  let component: DanshopHomeComponent;
  let fixture: ComponentFixture<DanshopHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
