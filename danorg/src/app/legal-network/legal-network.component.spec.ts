import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNetworkComponent } from './legal-network.component';

describe('LegalNetworkComponent', () => {
  let component: LegalNetworkComponent;
  let fixture: ComponentFixture<LegalNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
