import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStationResourcesComponent } from './test-station-resources.component';

describe('TestStationResourcesComponent', () => {
  let component: TestStationResourcesComponent;
  let fixture: ComponentFixture<TestStationResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestStationResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStationResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
