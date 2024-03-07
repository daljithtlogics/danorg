import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinInfo } from './kin.component';

describe('KinInfo', () => {
  let component: KinInfo;
  let fixture: ComponentFixture<KinInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KinInfo ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KinInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
