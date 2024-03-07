import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianNetworkComponent } from './physician-network.component';

describe('PhysicianNetworkComponent', () => {
  let component: PhysicianNetworkComponent;
  let fixture: ComponentFixture<PhysicianNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicianNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
