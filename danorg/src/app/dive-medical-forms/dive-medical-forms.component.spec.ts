import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveMedicalFormsComponent } from './dive-medical-forms.component';

describe('DiveMedicalFormsComponent', () => {
  let component: DiveMedicalFormsComponent;
  let fixture: ComponentFixture<DiveMedicalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveMedicalFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveMedicalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
