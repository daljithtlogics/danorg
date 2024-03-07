import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicFlyingComponent } from './infographic-flying.component';

describe('InfographicFlyingComponent', () => {
  let component: InfographicFlyingComponent;
  let fixture: ComponentFixture<InfographicFlyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicFlyingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicFlyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
