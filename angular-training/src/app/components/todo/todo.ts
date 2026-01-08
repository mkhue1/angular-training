import { ChangeDetectorRef, Component, inject} from "@angular/core"
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddTodoSheetComponent } from "../add-todo-sheet/add-todo-sheet";

interface todoItem{
    content: string,
    completed: boolean,
    priority: "High" | "Medium" | "Low",
    dueDate: Date
}

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.html',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatBottomSheetModule],
  styleUrl: './todo.css',
})
export class TodoComponent{
    todoList : todoItem[] = [];
    submitted = false;
    showForm = false;
    minDate: Date;
    activeCount = 0;
    doneCount = 0;

    private bottomSheet = inject(MatBottomSheet);

    constructor(private cdr: ChangeDetectorRef) {
        this.minDate = new Date();
        this.minDate.setHours(0, 0, 0, 0);
    }
    toggleDone (id:number) {
            this.todoList[id].completed = !this.todoList[id].completed;
            this.updateCounts();
    }

    openBottomSheet() {
    this.bottomSheet
        .open(AddTodoSheetComponent)
        .afterDismissed()
        .subscribe(result => {
            if (!result) return;

            this.todoList = [
                ...this.todoList,
                {
                    content: result.task,
                    completed: false,
                    priority: result.priority,
                    dueDate: result.dueDate
                }
            ];

            this.updateCounts(); 
        });
    }



    deleteTodo(index: number) {
        this.todoList.splice(index, 1);
        this.updateCounts(); 
    }


    updateCounts() {
        this.activeCount = this.todoList.filter(todo => !todo.completed).length;
        this.doneCount = this.todoList.filter(todo => todo.completed).length;
    }
}