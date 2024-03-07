import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraProgramComponent } from './hira-program.component';

describe('HiraProgramComponent', () => {
  let component: HiraProgramComponent;
  let fixture: ComponentFixture<HiraProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiraProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
