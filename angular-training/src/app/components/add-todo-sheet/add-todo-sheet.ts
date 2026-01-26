import {Component, inject, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { todoItem } from '../todo/todo';

@Component({
  selector: 'app-add-todo-sheet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './add-todo-sheet.html',
  styleUrl: './add-todo-sheet.css',
})
export class AddTodoSheetComponent implements OnInit{
  minDate : Date;
  constructor(@Inject(MAT_DIALOG_DATA) public data: todoItem) {
        this.minDate = new Date();
        this.minDate.setHours(0, 0, 0, 0);
    }

  private sheetRef = inject(MatDialogRef<AddTodoSheetComponent>);
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    completed: new FormControl(false),
    priority: new FormControl('' as "HIGH" | "MEDIUM" | "LOW", Validators.required),
    date: new FormControl(new Date(), Validators.required)
  });

  submit() {
    if (this.todoForm.invalid) return;
    const newTodo = {
      title: this.todoForm.value.title!,
      completed: this.todoForm.value.completed!,
      priority: this.todoForm.value.priority!,
      date: this.todoForm.value.date!
    };
    console.log("Save")
    this.sheetRef.close(newTodo);
  }

  cancel() {
    this.sheetRef.close();
  }

  ngOnInit() {
    if (this.data) {
      this.todoForm.patchValue({
        title: this.data.title,
        completed: this.data.completed,
        priority: this.data.priority,
        date: new Date(this.data.date)
      });
    }
  }
}
