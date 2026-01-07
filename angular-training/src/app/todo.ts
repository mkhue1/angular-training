import { ChangeDetectorRef, Component, inject} from "@angular/core"
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddTodoSheetComponent } from "./add-todo-sheet/add-todo-sheet";

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
    todoList : any[] = [];
    submitted = false;
    showForm = false;
    minDate: Date;

    private bottomSheet = inject(MatBottomSheet);

    constructor(private cdr: ChangeDetectorRef) {
        this.minDate = new Date();
        this.minDate.setHours(0, 0, 0, 0);
    }
    toggleDone (id:number) {
        this.todoList.map((v, i) => {if (i == id) v.completed = !v.completed;
            return v;
        })
    }

    openBottomSheet() {
        console.log('123');
        this.bottomSheet
            .open(AddTodoSheetComponent)
            .afterDismissed()
            .subscribe(result => {
        console.log('ressult', result);

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
        });
    }

    deleteTodo(index: number) {
        this.todoList.splice(index, 1);
    }


    activeTodo (){
        return this.todoList.filter(todo => !todo.completed).length
    }
    doneTodo (){
        return this.todoList.filter(todo => todo.completed).length
    }
}