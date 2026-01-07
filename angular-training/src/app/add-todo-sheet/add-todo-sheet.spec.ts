import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoSheet } from './add-todo-sheet';

describe('AddTodoSheet', () => {
  let component: AddTodoSheet;
  let fixture: ComponentFixture<AddTodoSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodoSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
