import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicPfoComponent } from './infographic-pfo.component';

describe('InfographicPfoComponent', () => {
  let component: InfographicPfoComponent;
  let fixture: ComponentFixture<InfographicPfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfographicPfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicPfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
