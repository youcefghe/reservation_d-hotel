import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivryComponent } from './delivry.component';

describe('DelivryComponent', () => {
  let component: DelivryComponent;
  let fixture: ComponentFixture<DelivryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelivryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
