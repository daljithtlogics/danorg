import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberNetworkComponent } from './chamber-network.component';

describe('ChamberNetworkComponent', () => {
  let component: ChamberNetworkComponent;
  let fixture: ComponentFixture<ChamberNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamberNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
