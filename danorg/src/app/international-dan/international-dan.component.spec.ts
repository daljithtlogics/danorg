import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalDanComponent } from './international-dan.component';

describe('InternationalDanComponent', () => {
  let component: InternationalDanComponent;
  let fixture: ComponentFixture<InternationalDanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalDanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalDanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
