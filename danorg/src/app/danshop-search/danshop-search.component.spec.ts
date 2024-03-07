import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopSearchComponent } from './danshop-search.component';

describe('DanshopSearchComponent', () => {
  let component: DanshopSearchComponent;
  let fixture: ComponentFixture<DanshopSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
