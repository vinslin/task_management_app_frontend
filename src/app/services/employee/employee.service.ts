import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee, IEmpScroll } from '../../models/interfaces/IEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7074/v1Employee';
  private updateUrl = 'https://localhost:7074/v1Employee/UpdateEmployee/';
  private deleteUrl = 'https://localhost:7074/v1Employee/deleteemployee/';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiUrl);
  }

  addEmployee(
    name: string,
    email: string,
    role: string
  ): Observable<IEmployee> {
    const input = {
      userName: name,
      email: email,
      role: role,
    };

    return this.http.post<IEmployee>(this.apiUrl, input);
  }

  updateEmployee(
    id: string,
    name: string,
    email: string,
    role: string
  ): Observable<IEmployee> {
    const input = {
      userName: name,
      email: email,
      role: role,
    };

    return this.http.put<IEmployee>(`${this.updateUrl}${id}`, input);
  }
  getEmpScroll(): Observable<IEmpScroll[]> {
    // console.log('getalltask');
    return this.http.get<any[]>(`${this.apiUrl}/Getemployeeforscroller`);
  }

  getSingleEmployee(id: string): Observable<IEmployee> {
    // console.log('getalltask');
    return this.http.get<IEmployee>(`${this.apiUrl}/getsingleemployee/${id}`);
  }

  deleteEmployee(id: string): Observable<IEmployee> {
    return this.http.delete<any>(`${this.deleteUrl}${id}`);
  }
}
