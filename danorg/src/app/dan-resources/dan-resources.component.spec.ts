import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanResourcesComponent } from './dan-resources.component';

describe('DanResourcesComponent', () => {
  let component: DanResourcesComponent;
  let fixture: ComponentFixture<DanResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
