import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    // Create mock services
    mockAuthService = {
      getToken: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow navigation if token exists', () => {
    mockAuthService.getToken.and.returnValue('fake-token');
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should block navigation and redirect if token does not exist', () => {
    mockAuthService.getToken.and.returnValue(null);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
