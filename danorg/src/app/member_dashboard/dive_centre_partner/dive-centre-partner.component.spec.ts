import { ComponentFixture, TestBed } from '@angular/core/testing';   
import { DiveCentrePartner } from './dive-centre-partner.component';

describe('DiveCentrePartner', () => {
  let component: DiveCentrePartner;
  let fixture: ComponentFixture<DiveCentrePartner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveCentrePartner ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveCentrePartner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
