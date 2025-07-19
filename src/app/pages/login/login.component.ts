import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http
        .post<any>(
          'https://localhost:7074/api/Auth/Login',
          this.loginForm.value
        )
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userName', res.userName);
            localStorage.setItem('expires_At', res.expiresAt);
            localStorage.setItem('role', res.role);
            localStorage.setItem('email', res.email);

            this._authService.broadcastStoredRole(); //  Broadcast updated role
            this._authService.broadcastStoredLogin();
            this.router.navigate(['/task']);
          },
          error: (err) => {
            this.errorMessage = 'Invalid Credentials';
          },
        });
    }
  }

  gotoSignup(): void {
    this.router.navigate(['/signup']);
  }
}
