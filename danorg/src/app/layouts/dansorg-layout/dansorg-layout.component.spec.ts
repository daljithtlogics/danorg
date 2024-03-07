import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DansorgLayoutComponent } from './dansorg-layout.component';

describe('DansorgLayoutComponent', () => {
  let component: DansorgLayoutComponent;
  let fixture: ComponentFixture<DansorgLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DansorgLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DansorgLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
