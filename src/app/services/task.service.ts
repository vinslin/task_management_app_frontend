import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tasks {
  taskId: string;
  title: string;
  description: string;
  daysForCompletion: number;
  dueDate: string;
  priority: number;
  isCompleted: number;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
}

export interface AddTask {
  title: string;
  description: string;
  daysForCompletion: number;
  priority: number;
  projectId: string;
  employeeId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7074/api/Tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.apiUrl}/getAllTasks`);
  }

  addTask(task: AddTask): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, task);
  }

  updateTask(id: string, task: any): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.apiUrl}/UpdateTask`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTask/${id}`);
  }
}
