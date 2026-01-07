import { Component, inject} from "@angular/core"
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";

interface todoItem{
    content: string,
    completed: boolean
}

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './todo.css'
})
export class TodoComponent{
    todoList : todoItem[] = [];
    toggleDone (id:number) {
        this.todoList.map((v, i) => {if (i == id) v.completed = !v.completed;
            return v;
        })
    }
    private formBuilder = inject(FormBuilder);
    todoForm = this.formBuilder.group({
        task: ['', Validators.required],
        completed: ['']
        }
    )

    addTodo() {
        if (this.todoForm.invalid) return;

        this.todoList.push({
        content: this.todoForm.value.task!,
        completed: false
        });

        this.todoForm.reset();
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