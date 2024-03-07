import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMember } from './profile.component';

describe('ProfileMember', () => {
  let component: ProfileMember;
  let fixture: ComponentFixture<ProfileMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMember ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
