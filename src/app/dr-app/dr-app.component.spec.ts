import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrAppComponent } from './dr-app.component';

describe('DrAppComponent', () => {
  let component: DrAppComponent;
  let fixture: ComponentFixture<DrAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
