import {Component, inject, OnInit, signal, computed} from "@angular/core"
import {CommonModule, formatDate} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddTodoSheetComponent} from "../add-todo-sheet/add-todo-sheet";
import {MatIconModule} from '@angular/material/icon';
import {TodoService} from '../../service/todo-service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface todoItem{
  id?: number;
  title: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  date: Date
}

export interface todoApiRequest{
  title: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  date: string;
}

export interface todoApiResponse {
  id: number;
  title: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  date: string;
}


@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    ],
  styleUrl: './todo.css',
})
export class TodoComponent implements OnInit{
  todoList = signal<todoItem[]>([]);

  activeCount = computed(() => this.todoList().filter(t => !t.completed).length);

  doneCount = computed(() => this.todoList().filter(t => t.completed).length);
  searchText = signal('');
  statusFilter = signal<'all' | 'done' | 'active'>('all');
  priorityFilter = signal<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  filteredTodos = computed(() => {
    return this.todoList().filter(todo => {

      // 1. Search theo title
      const matchText =
        todo.title.toLowerCase().includes(
          this.searchText().toLowerCase()
        );

      // 2. Filter theo trạng thái
      const matchStatus =
        this.statusFilter() === 'all' ||
        (this.statusFilter() === 'done' && todo.completed) ||
        (this.statusFilter() === 'active' && !todo.completed);

      // 3. Filter theo priority
      const matchPriority =
        this.priorityFilter() === 'ALL' ||
        todo.priority === this.priorityFilter();

      return matchText && matchStatus && matchPriority;
    });
  });

  private snackBar = inject(MatSnackBar);
  constructor( private dialog: MatDialog, private todoService : TodoService) {}
  ngOnInit () {
    this.todoService.getTodoList().subscribe(data => {this.todoList.set(
      data.map(t => ({...t, date: new Date(t.date)})));});
  }

  private createTodoFromSource(source: {
    title: string;
    completed: boolean;
    date: Date;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }) {
    const apiTodo = {
      title: source.title,
      completed: source.completed,
      date: formatDate(source.date, 'yyyy-MM-dd', 'en-US'),
      priority: source.priority,
    };

    this.todoService.createTodoTask(apiTodo).subscribe({
      next: saved => {
        const uiTodo: todoItem = {
          ...saved,
          date: new Date(saved.date)
        };
        this.todoList.update(list => [...list, uiTodo]);
        this.snackBar.open(
          'Todo created successfully ✅',
          'OK',
          { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' }
        );
      },
      error: () => {
        this.snackBar.open('Create failed ❌', 'Close', { duration: 3000 });
      }
    });
  }

  openBottomSheet() {
    const sheetRef = this.dialog.open(AddTodoSheetComponent);
    sheetRef.afterClosed().subscribe(todo => {
      if (!todo) return;
      this.createTodoFromSource(todo);
    });
  }

  duplicateTodo(id: number) {
    const editingTodo = this.todoList().find(t => t.id === id);
    if (!editingTodo) return;
    this.createTodoFromSource(editingTodo);
  }

    deleteTodo(id: number) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todoList.update(list =>
          list.filter(todo => todo.id !== id)
        );
      });
    }

    editTodo (id: number){
      const editingTodo = this.todoList().find(t => t.id === id);
      if(!editingTodo) return;
      const sheetRef = this.dialog.open(AddTodoSheetComponent, {data:editingTodo});
      sheetRef.afterClosed().subscribe(result => {
        if (!result) return;
        const apiPayload = {
          title: result.title,
          completed: result.completed,
          priority: result.priority,
          date: formatDate(result.date, 'yyyy-MM-dd', 'en-US')
        };

        this.todoService.updateTodo(id, apiPayload).subscribe(updated => {
          this.todoList.update(list => list.map(t => t.id === updated.id
            ? { ...updated, date: new Date(updated.date) } : t));
            this.snackBar.open(
            'Todo updated successfully ✏️',
            'OK',
              { duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              }
            );
          });
        });
    }

  toggleDone(id: number) {
    const editingTodo = this.todoList().find(t => t.id === id);
    if (!editingTodo) return;
    this.todoService.updateTodo(id, {
      title: editingTodo.title,
      completed: !editingTodo.completed,
      priority: editingTodo.priority,
      date: formatDate(editingTodo.date, 'yyyy-MM-dd', 'en-US')}).subscribe(updated  => {
      this.todoList.update(list => list.map(t => t.id === updated.id
        ? { ...updated, date: new Date(updated.date) } : t));
    });
  }

}
