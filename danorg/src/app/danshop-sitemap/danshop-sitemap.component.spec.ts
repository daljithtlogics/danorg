import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopSitemapComponent } from './danshop-sitemap.component';

describe('DanshopSitemapComponent', () => {
  let component: DanshopSitemapComponent;
  let fixture: ComponentFixture<DanshopSitemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopSitemapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopSitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
