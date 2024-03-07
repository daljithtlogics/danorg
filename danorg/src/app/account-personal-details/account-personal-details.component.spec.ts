import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPersonalDetailsComponent } from './account-personal-details.component';

describe('AccountPersonalDetailsComponent', () => {
  let component: AccountPersonalDetailsComponent;
  let fixture: ComponentFixture<AccountPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPersonalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
