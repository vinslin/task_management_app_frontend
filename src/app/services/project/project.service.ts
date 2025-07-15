import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProScroll } from '../../models/interfaces/IProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://localhost:7074/Project';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(name: string, description: string): Observable<Project> {
    const input = {
      projectName: name,
      description: description,
    };
    return this.http.post<Project>(this.apiUrl, input);
  }

  updateProject(
    id: string,
    name: string,
    description: string
  ): Observable<Project> {
    const input = {
      projectName: name,
      description: description,
    };

    return this.http.put<Project>(`${this.apiUrl}/UpdateProject/${id}`, input);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/deleteProject/${id}`);
  }

  getProScroll(): Observable<ProScroll[]> {
    // console.log('getalltask');
    return this.http.get<any[]>(`${this.apiUrl}/Getprojectforscroller`);
  }
}
