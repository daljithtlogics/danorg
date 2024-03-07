import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicPropellersCanKillComponent } from './infographic-propellers-can-kill.component';

describe('InfographicPropellersCanKillComponent', () => {
  let component: InfographicPropellersCanKillComponent;
  let fixture: ComponentFixture<InfographicPropellersCanKillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicPropellersCanKillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicPropellersCanKillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
