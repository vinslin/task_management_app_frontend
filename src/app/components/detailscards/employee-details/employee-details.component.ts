import { Component, Input } from '@angular/core';
import { IEmployee } from '../../../models/interfaces/IEmployee';
import { Employee } from '../../../models/class/Employee';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  @Input() currentEmployee: IEmployee = new Employee();
}
