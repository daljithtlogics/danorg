import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DansadansaorgComponent } from './dansadansaorg.component';

describe('DansadansaorgComponent', () => {
  let component: DansadansaorgComponent;
  let fixture: ComponentFixture<DansadansaorgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DansadansaorgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DansadansaorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
