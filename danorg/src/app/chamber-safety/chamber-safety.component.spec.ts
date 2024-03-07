import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberSafetyComponent } from './chamber-safety.component';

describe('ChamberSafetyComponent', () => {
  let component: ChamberSafetyComponent;
  let fixture: ComponentFixture<ChamberSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamberSafetyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
