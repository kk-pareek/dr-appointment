import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrFacingComponent } from './dr-facing.component';

describe('DrFacingComponent', () => {
  let component: DrFacingComponent;
  let fixture: ComponentFixture<DrFacingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrFacingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrFacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
