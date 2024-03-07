import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicSevenMistakesComponent } from './infographic-seven-mistakes.component';

describe('InfographicSevenMistakesComponent', () => {
  let component: InfographicSevenMistakesComponent;
  let fixture: ComponentFixture<InfographicSevenMistakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicSevenMistakesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicSevenMistakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
