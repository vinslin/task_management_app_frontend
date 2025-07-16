import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import {
  IAnalyticsTask,
  IresponseTask,
  ITasks,
} from '../../../models/interfaces/ITask';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/class/Task';

import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { TaskDetailsComponent } from '../../../components/detailscards/task-details/task-details.component';
import { ProjectDetailsComponent } from '../../../components/detailscards/project-details/project-details.component';
import { EmployeeDetailsComponent } from '../../../components/detailscards/employee-details/employee-details.component';
import { IEmployee, IEmpScroll } from '../../../models/interfaces/IEmployee';
import { IProject, IProScroll } from '../../../models/interfaces/IProject';
import { Employee } from '../../../models/class/Employee';
import { Project } from '../../../models/class/Project';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ProjectService } from '../../../services/project/project.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-analytics',
  imports: [
    CommonModule,
    BarChartComponent,
    TaskDetailsComponent,
    ProjectDetailsComponent,
    EmployeeDetailsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './project-analytics.component.html',
  styleUrl: './project-analytics.component.css',
})
export class ProjectAnalyticsComponent implements OnInit {
  projectScroll: IProScroll[] = [];

  projectTasks: IresponseTask = {} as IresponseTask;

  @Output() currentTask: ITasks = new Task();
  @Output() currentEmployee: IEmployee = new Employee();
  @Output() currentProject: IProject = new Project();
  maxLength: number = 0;

  completedTasks: IAnalyticsTask[] = [];
  dueTasks: IAnalyticsTask[] = [];
  timeHavingTasks: IAnalyticsTask[] = [];

  employeeDetails: boolean = false;
  projectDetails: boolean = false;
  taskDetails: boolean = false;
  employeeService: any;
  taskForm: any;

  constructor(
    private _taskService: TaskService,
    private _employeeService: EmployeeService,
    private _projectService: ProjectService,
    private fb: FormBuilder
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

  formBuild(): void {
    const now = new Date();
    const isoNow = now.toISOString().slice(0, 16);

    this.taskForm = this.fb.group({
      projectId: ['', Validators.required],
    });
  }

  getAllProject(): void {
    this._projectService.getProScroll().subscribe({
      next: (data) => (this.projectScroll = data),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }

  getProjectTasks(): void {
    const selectedId = this.taskForm.value.projectId;

    if (!selectedId) return;

    this._taskService.projectTask(selectedId).subscribe({
      next: (data) => {
        this.projectTasks = data;
        this.completedTasks = data.completedTasks || [];
        this.dueTasks = data.dueTasks || [];
        this.timeHavingTasks = data.timeHavingTasks || [];
        this.updateMaxLength();
      },
      error: (err) => console.error('Error fetching employee tasks:', err),
    });
  }

  getCurrentTask(id: string) {
    this._taskService.getSingleTask(id).subscribe({
      next: (data) => {
        this.currentTask = data;
      },
      error: (err) => console.error('Error fetching current tasks:', err),
    });
  }

  ngOnInit(): void {
    this.getAllProject();
    this.formBuild();
  }

  onTaskcli(id: string): void {
    // this.currentTask = task;
    this.getCurrentTask(id);
    this.taskDetails = true;
    this.employeeDetails = false;
    this.projectDetails = false;

    console.log('hi');
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;
    this.employeeDetails = false;
    this.projectDetails = false;
    this.taskDetails = false;

    const formValue = this.taskForm.value;
    this.getProjectTasks();
  }
}
