import { ITasks } from '../interfaces/ITask';

export class Task implements ITasks {
  taskId: string;
  title: string;
  description: string;
  daysForCompletion: number;
  dueDate: string;
  priority: number;
  isCompleted: number;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;

  constructor() {
    (this.taskId = ''),
      (this.title = ''),
      (this.description = ''),
      (this.daysForCompletion = 0),
      (this.dueDate = ''),
      (this.priority = 0),
      (this.isCompleted = 0),
      (this.employeeId = ''),
      (this.employeeName = ''),
      (this.projectId = ''),
      (this.projectName = '');
  }
}
