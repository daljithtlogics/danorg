import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopHeaderComponent } from './danshop-header.component';

describe('DanshopHeaderComponent', () => {
  let component: DanshopHeaderComponent;
  let fixture: ComponentFixture<DanshopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
