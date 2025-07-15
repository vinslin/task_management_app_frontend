import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmpScroll } from '../../models/interfaces/IEmployee';
  
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7074/v1Employee';
  private updateUrl = 'https://localhost:7074/v1Employee/UpdateEmployee/';
  private deleteUrl = 'https://localhost:7074/v1Employee/deleteemployee/';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(name: string, email: string, role: string): Observable<Employee> {
    const input = {
      userName: name,
      email: email,
      role: role,
    };

    return this.http.post<Employee>(this.apiUrl, input);
  }

  updateEmployee(
    id: string,
    name: string,
    email: string,
    role: string
  ): Observable<Employee> {
    const input = {
      userName: name,
      email: email,
      role: role,
    };

    return this.http.put<Employee>(`${this.updateUrl}${id}`, input);
  }
  getEmpScroll(): Observable<EmpScroll[]> {
    // console.log('getalltask');
    return this.http.get<any[]>(`${this.apiUrl}/Getemployeeforscroller`);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<any>(`${this.deleteUrl}${id}`);
  }
}
