import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMangComponent } from './table-mang.component';

describe('TableMangComponent', () => {
  let component: TableMangComponent;
  let fixture: ComponentFixture<TableMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
