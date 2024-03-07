import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidNineteenComponent } from './covid-nineteen.component';

describe('CovidNineteenComponent', () => {
  let component: CovidNineteenComponent;
  let fixture: ComponentFixture<CovidNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidNineteenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
