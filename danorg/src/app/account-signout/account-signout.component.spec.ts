import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSignoutComponent } from './account-signout.component';

describe('AccountSignoutComponent', () => {
  let component: AccountSignoutComponent;
  let fixture: ComponentFixture<AccountSignoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSignoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
