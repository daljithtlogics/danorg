import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternPackagesComponent } from './intern-packages.component';

describe('InternPackagesComponent', () => {
  let component: InternPackagesComponent;
  let fixture: ComponentFixture<InternPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
