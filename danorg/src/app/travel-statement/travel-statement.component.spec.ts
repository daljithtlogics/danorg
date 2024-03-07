import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelStatementComponent } from './travel-statement.component';

describe('TravelStatementComponent', () => {
  let component: TravelStatementComponent;
  let fixture: ComponentFixture<TravelStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
