import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITasks } from '../../../models/interfaces/ITask';
import { Task } from '../../../models/class/Task';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  @Input() currentTask: ITasks = new Task();

  @Output() projectClicked = new EventEmitter<void>();

  @Output() employeeClicked = new EventEmitter<void>();

  onEmployeeClick(): void {
    this.employeeClicked.emit();
  }

  onProjectClick(): void {
    this.projectClicked.emit();
  }

  getPriorityLabel(value: number): string {
    switch (value) {
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      default:
        return 'Unknown';
    }
  }
}
