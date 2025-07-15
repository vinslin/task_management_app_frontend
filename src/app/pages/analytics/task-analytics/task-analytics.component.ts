import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { ITasks } from '../../../models/interfaces/ITask';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/class/Task';

import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { TaskDetailsComponent } from '../../../components/detailscards/task-details/task-details.component';
import { ProjectDetailsComponent } from '../../../components/detailscards/project-details/project-details.component';
import { EmployeeDetailsComponent } from '../../../components/detailscards/employee-details/employee-details.component';
import { IEmployee } from '../../../models/interfaces/IEmployee';
import { IProject } from '../../../models/interfaces/IProject';
import { Employee } from '../../../models/class/Employee';
import { Project } from '../../../models/class/Project';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ProjectService } from '../../../services/project/project.service';
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
  @Output() currentEmployee: IEmployee = new Employee();
  @Output() currentProject: IProject = new Project();
  maxLength: number = 0;
  completedTasks: ITasks[] = [];
  dueTasks: ITasks[] = [];
  timeHavingTasks: ITasks[] = [];

  employeeDetails: boolean = false;
  projectDetails: boolean = false;
  taskDetails: boolean = false;

  constructor(
    private _taskService: TaskService,
    private _employeeService: EmployeeService,
    private _projectService: ProjectService
  ) {}

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
      this._employeeService
        .getSingleEmployee(this.currentTask.employeeId)
        .subscribe({
          next: (data) => {
            this.currentEmployee = data;
          },
          error: (err) =>
            console.error('Error fetching time having tasks:', err),
        });
    }
  }

  projectDetailShow(): void {
    if (this.projectDetails == true) {
      this.projectDetails = false;
    } else {
      this.projectDetails = true;
      this._projectService
        .getSingleProject(this.currentTask.projectId)
        .subscribe({
          next: (data) => {
            this.currentProject = data;
          },
          error: (err) =>
            console.error('Error fetching time having tasks:', err),
        });
    }
  }

  ngOnInit(): void {
    this.getCompletedTasks();
    this.getDueTasks();
    this.getTimeHavingTasks();
  }

  onTaskcli(task: ITasks): void {
    this.currentTask = task;
    this.taskDetails = true;
    this.employeeDetails = false;
    this.projectDetails = false;

    console.log('hi');
  }
}
