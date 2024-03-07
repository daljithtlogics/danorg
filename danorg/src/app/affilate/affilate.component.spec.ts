import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateComponent } from './affilate.component';

describe('AffilateComponent', () => {
  let component: AffilateComponent;
  let fixture: ComponentFixture<AffilateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffilateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffilateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
