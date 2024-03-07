import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshYouSkillsComponent } from './refresh-you-skills.component';

describe('RefreshYouSkillsComponent', () => {
  let component: RefreshYouSkillsComponent;
  let fixture: ComponentFixture<RefreshYouSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshYouSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshYouSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
