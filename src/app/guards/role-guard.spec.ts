import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role-guard';
import { AuthService } from '../services/authentication/auth.service';
import { Role } from '../models/role.enum';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      getUserRole: jasmine.createSpy('getUserRole'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(RoleGuard);
  });
  it('should allow access if user role is in allowedRoles', () => {
    const route = {
      data: { roles: [Role.Manager] },
    } as Partial<ActivatedRouteSnapshot> as ActivatedRouteSnapshot;

    authServiceMock.getUserRole.and.returnValue(Role.Manager);

    expect(guard.canActivate(route)).toBeTrue();
  });

  it('should deny access if user role is not in allowedRoles', () => {
    const route = {
      data: { roles: [Role.Director] },
    } as Partial<ActivatedRouteSnapshot> as ActivatedRouteSnapshot;

    authServiceMock.getUserRole.and.returnValue(Role.Manager);

    expect(guard.canActivate(route)).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });
});
