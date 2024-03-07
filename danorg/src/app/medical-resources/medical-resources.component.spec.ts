import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalResourcesComponent } from './medical-resources.component';

describe('MedicalResourcesComponent', () => {
  let component: MedicalResourcesComponent;
  let fixture: ComponentFixture<MedicalResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
