import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStudent } from './provider.component';

describe('InstructorStudent', () => {
  let component: InstructorStudent;
  let fixture: ComponentFixture<InstructorStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorStudent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
