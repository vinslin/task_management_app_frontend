import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Tasks } from '../../services/task.service';
import { EmpScroll,EmployeeService} from '../../services/employee.service'
import { ProjectService, ProScroll } from '../../services/project.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true, // If using standalone component
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'], // ✅ Corrected
})
export class TaskComponent implements OnInit {
  tasks: Tasks[] = [];
  empScroll: EmpScroll[] = [];
  proScroll: ProScroll[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private employeeService:EmployeeService
  ) {}
  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tasks from API:', this.tasks);
      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }
  getAllEmp(): void {
    this.employeeService.getEmpScroll().subscribe({
      next: (data) => {
        this.empScroll = data;
        //console.log('Tasks from API:', this.tasks);
      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  getAllPro(): void {
    this.projectService.getProScroll().subscribe({
      next: (data) => {
        this.proScroll = data;
        //console.log('Tasks from API:', this.tasks);
      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllEmp();
    this.getAllPro();
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
