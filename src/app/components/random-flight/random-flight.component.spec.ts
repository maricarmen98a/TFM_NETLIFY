import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomFlightComponent } from './random-flight.component';

describe('RandomFlightComponent', () => {
  let component: RandomFlightComponent;
  let fixture: ComponentFixture<RandomFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
