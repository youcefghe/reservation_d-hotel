import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeMangComponent } from './time-mang.component';

describe('TimeMangComponent', () => {
  let component: TimeMangComponent;
  let fixture: ComponentFixture<TimeMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
