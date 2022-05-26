import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingPass2Component } from './boarding-pass2.component';

describe('BoardingPass2Component', () => {
  let component: BoardingPass2Component;
  let fixture: ComponentFixture<BoardingPass2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardingPass2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingPass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
