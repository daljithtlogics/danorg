import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryPartnersComponent } from './industry-partners.component';

describe('IndustryPartnersComponent', () => {
  let component: IndustryPartnersComponent;
  let fixture: ComponentFixture<IndustryPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
