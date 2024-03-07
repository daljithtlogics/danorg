import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerProgramsComponent } from './partner-programs.component';

describe('PartnerProgramsComponent', () => {
  let component: PartnerProgramsComponent;
  let fixture: ComponentFixture<PartnerProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
