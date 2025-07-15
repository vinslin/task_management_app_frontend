import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject, IProScroll } from '../../models/interfaces/IProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://localhost:7074/Project';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl);
  }

  addProject(name: string, description: string): Observable<IProject> {
    const input = {
      projectName: name,
      description: description,
    };
    return this.http.post<IProject>(this.apiUrl, input);
  }

  updateProject(
    id: string,
    name: string,
    description: string
  ): Observable<IProject> {
    const input = {
      projectName: name,
      description: description,
    };

    return this.http.put<IProject>(`${this.apiUrl}/UpdateProject/${id}`, input);
  }

  deleteProject(id: string): Observable<IProject> {
    return this.http.delete<IProject>(`${this.apiUrl}/deleteProject/${id}`);
  }

  getProScroll(): Observable<IProScroll[]> {
    // console.log('getalltask');
    return this.http.get<any[]>(`${this.apiUrl}/Getprojectforscroller`);
  }
}
