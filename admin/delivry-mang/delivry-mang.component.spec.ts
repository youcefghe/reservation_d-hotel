import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivryMangComponent } from './delivry-mang.component';

describe('DelivryMangComponent', () => {
  let component: DelivryMangComponent;
  let fixture: ComponentFixture<DelivryMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelivryMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivryMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
