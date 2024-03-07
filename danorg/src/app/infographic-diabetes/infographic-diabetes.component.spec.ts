import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicDiabetesComponent } from './infographic-diabetes.component';

describe('InfographicDiabetesComponent', () => {
  let component: InfographicDiabetesComponent;
  let fixture: ComponentFixture<InfographicDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicDiabetesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
