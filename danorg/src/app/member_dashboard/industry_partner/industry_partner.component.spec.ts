import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryPartner } from './diving_family.component';

describe('IndustryPartner', () => {
  let component: IndustryPartner;
  let fixture: ComponentFixture<IndustryPartner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryPartner ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryPartner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
