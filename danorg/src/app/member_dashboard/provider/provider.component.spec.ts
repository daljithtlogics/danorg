import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMember } from './provider.component';

describe('ProviderMember', () => {
  let component: ProviderMember;
  let fixture: ComponentFixture<ProviderMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderMember ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
