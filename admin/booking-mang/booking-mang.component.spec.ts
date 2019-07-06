import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMangComponent } from './booking-mang.component';

describe('BookingMangComponent', () => {
  let component: BookingMangComponent;
  let fixture: ComponentFixture<BookingMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
