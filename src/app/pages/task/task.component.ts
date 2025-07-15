import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task/task.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { ProjectService } from '../../services/project/project.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AddTask, ITasks } from '../../models/interfaces/ITask';
import { IEmpScroll } from '../../models/interfaces/IEmployee';
import { IProScroll } from '../../models/interfaces/IProject';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: ITasks[] = [];
  empScroll: IEmpScroll[] = [];
  proScroll: IProScroll[] = [];

  isEditMode: boolean = false;
  editingTaskId: string | null = null;

  taskForm!: FormGroup;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllEmp();
    this.getAllPro();
    this.formBuild();
  }

  formBuild(): void {
    const now = new Date();
    const isoNow = now.toISOString().slice(0, 16);

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [1, Validators.required],
      dueDate: [isoNow, Validators.required],
      employeeId: ['', Validators.required],
      projectId: ['', Validators.required],
      isCompleted: [0],
    });
  }

  resetForm(): void {
    this.taskForm.reset();
    this.formBuild();
    this.isEditMode = false;
    this.editingTaskId = null;
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  getAllEmp(): void {
    this.employeeService.getEmpScroll().subscribe({
      next: (data) => (this.empScroll = data),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }

  getAllPro(): void {
    this.projectService.getProScroll().subscribe({
      next: (data) => (this.proScroll = data),
      error: (err) => console.error('Error fetching projects:', err),
    });
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

dayCalc(inDate: any): number {
  const now = new Date();
  const dueDate = new Date(inDate); //  Ensure it's a Date object
  const diff = dueDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

  convertFOrmToAddTask(formValue: any): AddTask {
    const daysForCompletion = this.dayCalc(formValue.dueDate);

    return {
      title: formValue.title,
      description: formValue.description,
      priority: Number(formValue.priority),

      projectId: formValue.projectId,
      employeeId: formValue.employeeId,
      daysForCompletion: daysForCompletion > 0 ? daysForCompletion : 0,
    };
  }

  addTask(task: AddTask): void {
    this.taskService.addTask(task).subscribe({
      next: (newtask) => {
        //  this.tasks.push(newtask);
        this.resetForm();
        this.getAllTasks();
      },
      error: (err) => console.error('Error adding task:', err),
    });
  }

  editTask(task: ITasks): void {
    this.isEditMode = true;
    this.editingTaskId = task.taskId;

    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().slice(0, 16),
      priority: task.priority,
      employeeId: task.employeeId,
      projectId: task.projectId,
      isCompleted: task.isCompleted,
    });
  }

  updateTask(): void {
    if (!this.editingTaskId) return;

    const formVal = this.taskForm.value;

    const updatedPayload = {
      id: this.editingTaskId,
      title: formVal.title,
      description: formVal.description,
      priority: formVal.priority,
      dueDate: new Date(formVal.dueDate).toISOString(),
      isCompleted: formVal.isCompleted,
      employeeId: formVal.employeeId,
      projectId: formVal.projectId,
    };

    this.taskService.updateTask(this.editingTaskId, updatedPayload).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex((t) => t.taskId === updated.taskId);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
        this.resetForm();

        this.getAllTasks();
      },
      error: (err) => console.error('Update failed:', err),
    });
  }

  deleteTask(task: ITasks): void {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    if (this.isEditMode) {
      this.resetForm();
    }

    this.taskService.deleteTask(task.taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.taskId !== task.taskId);
        alert('Task deleted successfully');
      },
      error: (err) => console.error('Delete Error:', err),
    });
  }

  cancelUpdate(): void {
    this.resetForm();
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    if (this.isEditMode) {
      this.updateTask();
    } else {
      const add: AddTask = this.convertFOrmToAddTask(formValue);
      this.addTask(add);
    }
  }

}
