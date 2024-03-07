import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicLostAtSeaComponent } from './infographic-lost-at-sea.component';

describe('InfographicLostAtSeaComponent', () => {
  let component: InfographicLostAtSeaComponent;
  let fixture: ComponentFixture<InfographicLostAtSeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicLostAtSeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicLostAtSeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
