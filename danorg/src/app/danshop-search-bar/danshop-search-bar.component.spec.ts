import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopSearchBarComponent } from './danshop-search-bar.component';

describe('DanshopSearchBarComponent', () => {
  let component: DanshopSearchBarComponent;
  let fixture: ComponentFixture<DanshopSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
