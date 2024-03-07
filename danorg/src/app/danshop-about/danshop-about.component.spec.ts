import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopAboutComponent } from './danshop-about.component';

describe('DanshopAboutComponent', () => {
  let component: DanshopAboutComponent;
  let fixture: ComponentFixture<DanshopAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
