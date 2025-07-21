import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 ||
        error.error?.error === 'invalid_token' ||
        error.error?.error_description?.includes('expired')
      ) {
        //token expired logedout
        alert('Session expired . Please log in again');
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
