import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragListsComponent } from './drag-lists.component';

describe('DragListsComponent', () => {
  let component: DragListsComponent;
  let fixture: ComponentFixture<DragListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
