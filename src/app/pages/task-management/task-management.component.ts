import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ITasks } from '../../models/interfaces/ITask';
import { Task } from '../../models/class/Task';
import {
  DragDropModule,
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/class/Employee';
import { Project } from '../../models/class/Project';
import { EmployeeService } from '../../services/employee/employee.service';
import { ProjectService } from '../../services/project/project.service';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { TaskDetailsComponent } from '../../components/detailscards/task-details/task-details.component';
import { ProjectDetailsComponent } from '../../components/detailscards/project-details/project-details.component';
import { EmployeeDetailsComponent } from '../../components/detailscards/employee-details/employee-details.component';
import { IEmployee } from '../../models/interfaces/IEmployee';
import { IProject } from '../../models/interfaces/IProject';

@Component({
  selector: 'app-task-management',
  imports: [
    CommonModule,
    DragDropModule,

    BarChartComponent,
    TaskDetailsComponent,
    ProjectDetailsComponent,
    EmployeeDetailsComponent,
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css',
})
export class TaskManagementComponent implements OnInit {
  completedTasks: ITasks[] = [];
  incompletedTasks: ITasks[] = [];

  //for detail cards
  employeeDetails: boolean = false;
  projectDetails: boolean = false;
  taskDetails: boolean = false;

  @Output() currentTask: ITasks = new Task();
  @Output() currentEmployee: IEmployee = new Employee();
  @Output() currentProject: IProject = new Project();

  currentId: string = '';
  temp: string | null = null;

  constructor(
    private _taskService: TaskService,
    private _employeeService: EmployeeService,
    private _projectService: ProjectService
  ) {}

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

  getCurrentTask(id: string) {
    this._taskService.getSingleTask(id).subscribe({
      next: (data) => {
        this.currentTask = data;
      },
      error: (err) => console.error('Error fetching current tasks:', err),
    });
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

  getCompletedTasks(): void {
    this._taskService.completedTask().subscribe({
      next: (data) => {
        this.completedTasks = data;
        // console.log(this.completedTasks);
      },
      error: (err) => console.error('Error fetching completed tasks:', err),
    });
  }

  getIncompletedTasks(): void {
    this._taskService.incompletedTask().subscribe({
      next: (data) => {
        this.incompletedTasks = data;
        // console.log(this.incompletedTasks);
      },
      error: (err) => console.error('Error fetching incompleted tasks:', err),
    });
  }

  completeTask(): void {
    this._taskService.completeTask(this.currentId, this.temp).subscribe({
      next: (data) => {
        // this.incompleteTask = data;
        // console.log(this.incompletedTasks);
        this.getCompletedTasks();
        this.getIncompletedTasks();
      },
      error: (err) => console.error('Error fetching incompleted tasks:', err),
    });
  }

  incompleteTask(): void {
    this._taskService.incompleteTask(this.currentId).subscribe({
      next: (data) => {
        // this.incompleteTask = data;
        // console.log(this.incompletedTasks);
        this.getCompletedTasks();
        this.getIncompletedTasks();
      },
      error: (err) => console.error('Error fetching incompleted tasks:', err),
    });
  }

  ngOnInit(): void {
    this.getCompletedTasks();
    this.getIncompletedTasks();
  }

  drop(event: CdkDragDrop<ITasks[]>) {
    if (event.previousContainer === event.container) return;

    const movedTask = event.previousContainer.data[event.previousIndex];
    this.currentId = movedTask.taskId;

    // Move task between arrays
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // Update backend
    if (event.container.id === 'doneList') {
      this.completeTask(); // move to done
    } else {
      this.incompleteTask(); // move to to-do
    }
  }

  onTaskcli(id: string): void {
    // this.currentTask = task;
    this.getCurrentTask(id);
    this.taskDetails = true;
    this.employeeDetails = false;
    this.projectDetails = false;

    console.log('hi');
  }
}
