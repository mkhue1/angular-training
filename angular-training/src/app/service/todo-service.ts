import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {todoApiRequest, todoItem, todoApiResponse} from '../components/todo/todo';
import {inject} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private  baseURL = "http://localhost:8080/todo"
  private httpClient = inject(HttpClient)

  getTodoList() : Observable<todoItem[]>{
    return this.httpClient.get<todoItem[]>(this.baseURL)
  }

  createTodoTask(todoTask : todoApiRequest): Observable<todoApiRequest>{
    return this.httpClient.post<todoApiRequest>(this.baseURL, todoTask)
  }

  updateTodo(id : number,todoTask: Partial<todoApiRequest>): Observable<todoApiResponse>{
    return this.httpClient.put<todoApiResponse>(`${this.baseURL}/${id}`, todoTask)
  }

  deleteTodo(id : number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`)
  }
}
