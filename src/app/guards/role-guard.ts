import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { Role } from '../models/role.enum';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles: Role[] = route.data['roles'];
    const userRole = this.auth.getUserRole();
    if (userRole && allowedRoles.includes(userRole as Role)) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}

3.