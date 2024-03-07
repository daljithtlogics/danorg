import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsMember } from './qualifications.component';

describe('QualificationsMember', () => {
  let component: QualificationsMember;
  let fixture: ComponentFixture<QualificationsMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationsMember ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
