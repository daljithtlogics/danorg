import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicBasicLifeSupportComponent } from './infographic-basic-life-support.component';

describe('InfographicBasicLifeSupportComponent', () => {
  let component: InfographicBasicLifeSupportComponent;
  let fixture: ComponentFixture<InfographicBasicLifeSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicBasicLifeSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicBasicLifeSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
