import { Component } from '@angular/core';
import { EmployeeComponent } from '../../pages/employee/employee.component';
import { TaskComponent } from '../../pages/task/task.component';
import { ProjectComponent } from '../../pages/project/project.component';
import { AnalyticsComponent } from '../../pages/analytics/analytics.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    TaskComponent,
    ProjectComponent,
    EmployeeComponent,
    AnalyticsComponent,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
