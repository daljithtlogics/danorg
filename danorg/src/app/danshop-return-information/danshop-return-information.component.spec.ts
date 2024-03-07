import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanshopReturnInformationComponent } from './danshop-return-information.component';

describe('DanshopReturnInformationComponent', () => {
  let component: DanshopReturnInformationComponent;
  let fixture: ComponentFixture<DanshopReturnInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanshopReturnInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanshopReturnInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
