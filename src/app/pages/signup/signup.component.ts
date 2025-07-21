import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      passWord: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this._authService.signup(this.signupForm.value).subscribe({
        next: (data) => {
          if (data === true) {
            alert('User created successfully!');
            this.router.navigate(['/login']);
          } else {
            alert('Signup failed. Try again.');
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'An error occurred';
        },
      });
    }
  }

  gotoSignin(): void {
    this.router.navigate(['/login']);
  }
}
