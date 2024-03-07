import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicReleaseThePressureComponent } from './infographic-release-the-pressure.component';

describe('InfographicReleaseThePressureComponent', () => {
  let component: InfographicReleaseThePressureComponent;
  let fixture: ComponentFixture<InfographicReleaseThePressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicReleaseThePressureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicReleaseThePressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
