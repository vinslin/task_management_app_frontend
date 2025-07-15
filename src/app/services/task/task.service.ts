import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTask, ITasks } from '../../models/interfaces/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7074/api/Tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(`${this.apiUrl}/getAllTasks`);
  }

  addTask(task: AddTask): Observable<ITasks> {
    return this.http.post<ITasks>(this.apiUrl, task);
  }

  updateTask(id: string, task: any): Observable<ITasks> {
    return this.http.put<ITasks>(`${this.apiUrl}/UpdateTask`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTask/${id}`);
  }

  completedTask(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(`${this.apiUrl}/getcompletedtasks`);
  }

  incompletedTask(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(`${this.apiUrl}/getincompletedtasks`);
  }

  dueTask(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(`${this.apiUrl}/getduetasks`);
  }

  timeHavingTask(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(`${this.apiUrl}/gettimehavingtasks`);
  }
}
