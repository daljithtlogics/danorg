import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DansorgInnerLayoutComponent } from './dansorg-inner-layout.component';

describe('DansorgInnerLayoutComponent', () => {
  let component: DansorgInnerLayoutComponent;
  let fixture: ComponentFixture<DansorgInnerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DansorgInnerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DansorgInnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
