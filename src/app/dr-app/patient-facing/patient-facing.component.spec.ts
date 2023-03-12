import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFacingComponent } from './patient-facing.component';

describe('PatientFacingComponent', () => {
  let component: PatientFacingComponent;
  let fixture: ComponentFixture<PatientFacingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFacingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
