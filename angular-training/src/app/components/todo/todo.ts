import { ChangeDetectorRef, Component} from "@angular/core"
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { AddTodoSheetComponent } from "../add-todo-sheet/add-todo-sheet";
import { MatDialog } from "@angular/material/dialog";
import {MatIcon, MatIconModule} from '@angular/material/icon';

export interface todoItem{
    content: string,
    completed: boolean,
    priority: "High" | "Medium" | "Low",
    dueDate: Date
}

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.html',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
     MatDialogModule,
    MatIconModule,],
  styleUrl: './todo.css',
})
export class TodoComponent{
    todoList : todoItem[] = [];
    activeCount = 0;
    doneCount = 0;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog) {}
    toggleDone (id:number) {
        this.todoList[id].completed = !this.todoList[id].completed;
        this.updateCounts();
    }

    openBottomSheet() {
        const sheetRef = this.dialog.open(AddTodoSheetComponent);

        sheetRef.afterClosed().subscribe(todo => {
            this.todoList.push({
            content: todo.content,
            completed: false,
            priority: todo.priority as "High" | "Medium" | "Low",
            dueDate: todo.dueDate
            });

            this.updateCounts();
            this.cdr.detectChanges();
        });
    }



    deleteTodo(index: number) {
        this.todoList.splice(index, 1);
        this.updateCounts(); 
    }

    editTodo (index: number){
        const editingTodo = this.todoList[index];
        const sheetRef = this.dialog.open(AddTodoSheetComponent, {data:editingTodo});
        sheetRef.afterClosed().subscribe(result => {
            if (!result) return;
            this.todoList[index] = result
            
            this.updateCounts();
            this.cdr.detectChanges();
        });
    }


    updateCounts() {
        this.activeCount = this.todoList.filter(todo => !todo.completed).length;
        this.doneCount = this.todoList.filter(todo => todo.completed).length;
    }
}