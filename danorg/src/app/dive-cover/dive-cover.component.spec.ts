import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveCoverComponent } from './dive-cover.component';

describe('DiveCoverComponent', () => {
  let component: DiveCoverComponent;
  let fixture: ComponentFixture<DiveCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
