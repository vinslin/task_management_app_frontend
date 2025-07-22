import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ITasks } from '../../models/interfaces/ITask';
import { Task } from '../../models/class/Task';

@Component({
  selector: 'app-task-management',
  imports: [],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css',
})
export class TaskManagementComponent implements OnInit {
  completedTasks: ITasks[] = [];
  incompletedTasks: ITasks[] = [];

  currentId: string = 'd9f14557-31d6-4e5f-80a7-dba4029ab6f3';
  temp: string | null = null;

  constructor(private _taskService: TaskService) {}

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
    this._taskService.incompleteTask(this.currentId, this.temp).subscribe({
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

    this.completeTask();
  }
}
