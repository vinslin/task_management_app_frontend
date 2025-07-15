import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { IEmployee } from '../../models/interfaces/IEmployee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employees: IEmployee[] = [];
  isEditMode = false;
  editingEmployeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // ✅ Initialize the form with validators
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    // ✅ Load existing employees
    this.employeeService.getAllEmployee().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error', err),
    });
  }

  // ✅ Submit handler
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      console.log('Form Invalid');
      return;
    }

    const { name, email, role } = this.employeeForm.value;

    if (
      this.employees.find(
        (emp) => emp.email.toLowerCase() === email.toLowerCase()
      )
    ) {
      alert('This Email is already used by another employee');
      return;
    }

    if (this.employeeForm.valid && this.editingEmployeeId) {
      console.log('Form Data ✅:', this.employeeForm.value);

      this.employeeService
        .updateEmployee(this.editingEmployeeId, name, email, role)
        .subscribe({
          next: (updatedEmp) => {
            const index = this.employees.findIndex(
              (e) => e.id === updatedEmp.id
            );
            if (index !== -1) {
              this.employees[index] = updatedEmp;
            }
            this.resetForm();
          },
          error: (err) => console.error('Error ❌', err),
        });
    } else {
      console.log('Form Data ✅:', this.employeeForm.value);

      this.employeeService.addEmployee(name, email, role).subscribe({
        next: (newEmployee) => {
          this.employees.push(newEmployee); // ✅ Add new one to the list
          this.resetForm(); // ✅ Clear the form
        },
        error: (err) => console.error('Error ❌', err),
      });
    }
  }

  editEmployee(emp: IEmployee): void {
    this.isEditMode = true;
    this.editingEmployeeId = emp.id;

    this.employeeForm.setValue({
      name: emp.name,
      email: emp.email,
      role: emp.role,
    });
  }

  resetForm(): void {
    this.employeeForm.reset();
    this.isEditMode = false;
    this.editingEmployeeId = null;
  }

  deleteEmp(emp: IEmployee): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${emp.name}?`
    );
    if (!confirmDelete) return;

    if (this.isEditMode) {
      this.resetForm();
    }

    this.employeeService.deleteEmployee(emp.id).subscribe({
      next: () => {
        //  Remove the deleted employee from the list
        this.employees = this.employees.filter((e) => e.id !== emp.id);

        //  Show success alert
        alert('Employee deleted successfully!');
      },
      error: (err) => console.error('Delete Error ', err),
    });
  }

  cancelUpdate(): void {
    this.resetForm();
  }
}
