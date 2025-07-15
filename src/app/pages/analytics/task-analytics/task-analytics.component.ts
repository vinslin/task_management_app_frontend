import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { ITasks } from '../../../models/interfaces/ITask';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/class/Task';

import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { TaskDetailsComponent } from '../../../components/detailscards/task-details/task-details.component';
import { ProjectDetailsComponent } from '../../../components/detailscards/project-details/project-details.component';
import { EmployeeDetailsComponent } from '../../../components/detailscards/employee-details/employee-details.component';


@Component({
  selector: 'app-task-analytics',
  standalone: true,
  imports: [
    CommonModule,
    BarChartComponent,
    TaskDetailsComponent,
    ProjectDetailsComponent,
    EmployeeDetailsComponent,
  ],
  templateUrl: './task-analytics.component.html',
  styleUrl: './task-analytics.component.css',
})
export class TaskAnalyticsComponent implements OnInit {
  currentTask: ITasks = new Task();
  maxLength: number = 0;
  completedTasks: ITasks[] = [];
  dueTasks: ITasks[] = [];
  timeHavingTasks: ITasks[] = [];

  employeeDetails: boolean = false;
  projectDetails: boolean = false;

  constructor(private _taskService: TaskService) {}

  // Helper to generate [0, 1, ..., maxLength-1]
  createRange(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  updateMaxLength(): void {
    this.maxLength = Math.max(
      this.completedTasks.length,
      this.dueTasks.length,
      this.timeHavingTasks.length
    );
  }

  getCompletedTasks(): void {
    this._taskService.completedTask().subscribe({
      next: (data) => {
        this.completedTasks = data;
        this.updateMaxLength();
      },
      error: (err) => console.error('Error fetching completed tasks:', err),
    });
  }

  getDueTasks(): void {
    this._taskService.dueTask().subscribe({
      next: (data) => {
        this.dueTasks = data;
        this.updateMaxLength();
      },
      error: (err) => console.error('Error fetching due tasks:', err),
    });
  }

  getTimeHavingTasks(): void {
    this._taskService.timeHavingTask().subscribe({
      next: (data) => {
        this.timeHavingTasks = data;
        this.updateMaxLength();
      },
      error: (err) => console.error('Error fetching time having tasks:', err),
    });
  }

  employeeDetailShow(): void {
    if (this.employeeDetails == true) {
      this.employeeDetails = false;
    } else {
      this.employeeDetails = true;
    }
  }

  projectDetailShow(): void {
    if (this.projectDetails == true) {
      this.projectDetails = false;
    } else {
      this.projectDetails = true;
    }
  }

  ngOnInit(): void {
    this.getCompletedTasks();
    this.getDueTasks();
    this.getTimeHavingTasks();
  }

  onTaskcli(task: ITasks): void {
    this.currentTask = task;
    this.employeeDetails = false;
    this.projectDetails = false;

    console.log('hi');
  }
}
