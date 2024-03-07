import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfo } from './personal.component';

describe('PersonalInfo', () => {
  let component: PersonalInfo;
  let fixture: ComponentFixture<PersonalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfo ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
