import { Routes } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  },
  {
    path: 'task',
    loadComponent: () =>
      import('./pages/task/task.component').then((t) => t.TaskComponent),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./pages/employee/employee.component').then(
        (e) => e.EmployeeComponent
      ),
  },
  {
    path: 'project',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (p) => p.ProjectComponent
      ),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./pages/analytics/analytics.component').then(
        (a) => a.AnalyticsComponent
      ),
  },
];
