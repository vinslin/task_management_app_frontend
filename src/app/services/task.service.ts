import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tasks {
  taskId: string;
  title: string;
  description: string;
  daysForCompletion: number;
  dueDate: string; // ISO string from backend — will be parsed into Date if needed
  priority: number;
  isCompleted: number;

  employeeId: string;
  employeeName: string;

  projectId: string;
  projectName: string;
}



@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7074/api/Tasks/';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Tasks[]> {
    console.log('getalltask');
    return this.http.get<any[]>(`${this.apiUrl}getAllTasks`);
  }




}
