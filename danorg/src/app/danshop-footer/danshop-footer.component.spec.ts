import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopFooterComponent } from './danshop-footer.component';

describe('DanshopFooterComponent', () => {
  let component: DanshopFooterComponent;
  let fixture: ComponentFixture<DanshopFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
