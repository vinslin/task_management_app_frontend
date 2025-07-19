import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //oru value change ahagumpothu broadcast pannum subscripers ku

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);

  public role$ = this.roleSubject.asObservable();

  constructor() {}

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
    const role = this.getUserRole();
    this.roleSubject.next(role);
  }

  broadcastStoredRole(): void {
    const token = this.getToken();
    if (token) this.extractAndBroadcastRole(token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
