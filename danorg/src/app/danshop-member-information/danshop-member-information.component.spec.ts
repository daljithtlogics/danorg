import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopMemberInformationComponent } from './danshop-member-information.component';

describe('DanshopMemberInformationComponent', () => {
  let component: DanshopMemberInformationComponent;
  let fixture: ComponentFixture<DanshopMemberInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopMemberInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopMemberInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
