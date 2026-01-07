import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './add-todo-sheet.html',
  styleUrl: './add-todo-sheet.css',
})
export class AddTodoSheetComponent {
  minDate : Date;
  constructor() {
        this.minDate = new Date();
        this.minDate.setHours(0, 0, 0, 0);
    }
  private sheetRef = inject(MatBottomSheetRef<AddTodoSheetComponent>);

  todoForm = new FormGroup({
    task: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    dueDate: new FormControl(new Date(), Validators.required)
  });

  submit() {
    if (this.todoForm.invalid) return;

    this.sheetRef.dismiss({
      task: this.todoForm.value.task,
      priority: this.todoForm.value.priority,
      dueDate: this.todoForm.value.dueDate
    });
  }

  cancel() {
    this.sheetRef.dismiss();
  }
}
