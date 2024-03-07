import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopSubFooterComponent } from './danshop-sub-footer.component';

describe('DanshopSubFooterComponent', () => {
  let component: DanshopSubFooterComponent;
  let fixture: ComponentFixture<DanshopSubFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopSubFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopSubFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
