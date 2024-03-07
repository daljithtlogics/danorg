import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalSafetyResourcesComponent } from './operational-safety-resources.component';

describe('OperationalSafetyResourcesComponent', () => {
  let component: OperationalSafetyResourcesComponent;
  let fixture: ComponentFixture<OperationalSafetyResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalSafetyResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalSafetyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
