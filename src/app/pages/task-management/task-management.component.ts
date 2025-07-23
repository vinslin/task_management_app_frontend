import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ITasks } from '../../models/interfaces/ITask';
import { Task } from '../../models/class/Task';
import {
  DragDropModule,
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-management',
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css',
})
export class TaskManagementComponent implements OnInit {
  completedTasks: ITasks[] = [];
  incompletedTasks: ITasks[] = [];

  currentId: string = '';
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
}
