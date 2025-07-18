import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { Role } from './models/role.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
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
];
