import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualFreediverComponent } from './annual-freediver.component';

describe('AnnualFreediverComponent', () => {
  let component: AnnualFreediverComponent;
  let fixture: ComponentFixture<AnnualFreediverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualFreediverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualFreediverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
