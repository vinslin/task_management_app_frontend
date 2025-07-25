import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { Role } from './models/role.enum';
import { MainappComponent } from './components/mainapp/mainapp.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: MainappComponent,
    children: [
      {
        path: '',
        redirectTo: 'task',
        pathMatch: 'full',
      },
      {
        path: 'taskmanagement',
        loadComponent: () =>
          import('./pages/task-management/task-management.component').then(
            (m) => m.TaskManagementComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'practice',
        loadComponent: () =>
          import('./pages/practice/practice.component').then(
            (m) => m.PracticeComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'task',
        loadComponent: () =>
          import('./pages/task/task.component').then((t) => t.TaskComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'employee',
        loadComponent: () =>
          import('./pages/employee/employee.component').then(
            (e) => e.EmployeeComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'project',
        loadComponent: () =>
          import('./pages/project/project.component').then(
            (p) => p.ProjectComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/analytics/analytics.component').then(
            (a) => a.AnalyticsComponent
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.Director] },
        children: [
          {
            path: '',
            redirectTo: 'taskanalytics',
            pathMatch: 'full',
          },
          {
            path: 'taskanalytics',
            loadComponent: () =>
              import(
                './pages/analytics/task-analytics/task-analytics.component'
              ).then((m) => m.TaskAnalyticsComponent),
          },
          {
            path: 'employeeanalytics',
            loadComponent: () =>
              import(
                './pages/analytics/employee-analytics/employee-analytics.component'
              ).then((m) => m.EmployeeAnalyticsComponent),
          },
          {
            path: 'projectanalytics',
            loadComponent: () =>
              import(
                './pages/analytics/project-analytics/project-analytics.component'
              ).then((m) => m.ProjectAnalyticsComponent),
          },
        ],
      },
    ],
  }, //eager loading
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
