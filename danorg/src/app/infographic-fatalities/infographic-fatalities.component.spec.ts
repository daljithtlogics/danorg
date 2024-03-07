import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicFatalitiesComponent } from './infographic-fatalities.component';

describe('InfographicFatalitiesComponent', () => {
  let component: InfographicFatalitiesComponent;
  let fixture: ComponentFixture<InfographicFatalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicFatalitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicFatalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
