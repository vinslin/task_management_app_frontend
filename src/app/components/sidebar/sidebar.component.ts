import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../../pages/employee/employee.component';
import { TaskComponent } from '../../pages/task/task.component';
import { ProjectComponent } from '../../pages/project/project.component';
import { AnalyticsComponent } from '../../pages/analytics/analytics.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    TaskComponent,
    ProjectComponent,
    EmployeeComponent,
    AnalyticsComponent,
    RouterLink,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  analyticShow = false;

  constructor(private _authService: AuthService) {}

  //older method
  // getRole(): void {
  //   const data = this._authService.getUserRole();

  //   if (data === 'Director') {
  //     this.analyticShow = true;
  //   }
  // }

  ngOnInit(): void {
    this._authService.role$.subscribe((role) => {
      this.analyticShow = role === 'Director'; //anga value change panna inga ahagum
    });
  }
}
