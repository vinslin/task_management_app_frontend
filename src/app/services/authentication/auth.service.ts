import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //oru value change ahagumpothu broadcast pannum subscripers ku
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/interfaces/IUser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7074/api/Auth/';

  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  //for login logout button
  private loginSubject = new BehaviorSubject<boolean | null>(null);
  public login$ = this.loginSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }
  //broadcast panna use pandrathu
  private extractAndBroadcastRole(token: string): void {
    const role = this.getUserRole(); //extract role from token
    this.roleSubject.next(role); //broadcast it to subscribers
  }

  broadcastStoredRole(): void {
    const token = this.getToken();
    if (token) this.extractAndBroadcastRole(token);
  }

  private extractAndBroadcastLogin(): void {
    const log = this.isLoggedIn(); //extract role from token
    this.loginSubject.next(log); //broadcast it to subscribers
  }

  broadcastStoredLogin(): void {
    const token = this.getToken();
    if (token) this.extractAndBroadcastLogin();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('expires_At');
  }

  signup(user: IUser): import('rxjs').Observable<boolean> {
    console.log(user);
    return this.http.post<boolean>(`${this.apiUrl}Register`, user);
  }
}
