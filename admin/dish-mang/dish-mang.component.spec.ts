import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishMangComponent } from './dish-mang.component';

describe('DishMangComponent', () => {
  let component: DishMangComponent;
  let fixture: ComponentFixture<DishMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
