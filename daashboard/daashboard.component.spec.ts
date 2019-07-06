import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaashboardComponent } from './daashboard.component';

describe('DaashboardComponent', () => {
  let component: DaashboardComponent;
  let fixture: ComponentFixture<DaashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
