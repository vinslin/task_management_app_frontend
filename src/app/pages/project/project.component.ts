import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;

  projects: Project[] = [];
  isEditMode = false;

  editingProjectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  resetForm(): void {
    this.projectForm.reset();
    this.isEditMode = false;
    this.editingProjectId = null;
  }

  forminitialization(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    //console.log('haha_mudiyala');
  }
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.error('Error', err),
    });
    console.log(this.projects);
  }

  ngOnInit(): void {
    this.forminitialization();
    this.loadProjects();
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const { name, description } = this.projectForm.value;

    if (
      this.projects.find(
        (project) => project.name.toLowerCase() == name.toLowerCase()
      )
    ) {
      alert('This Project name is already Exist');
      return;
    }
    //for updation update with api
    if (this.projectForm.valid && this.editingProjectId) {
      this.projectService
        .updateProject(this.editingProjectId, name, description)
        .subscribe({
          next: (updatedPro) => {
            const index = this.projects.findIndex(
              (p) => (p.id = updatedPro.id)
            );
            if (index !== -1) {
              this.projects[index] = updatedPro;
            }
            this.resetForm();
          },
          error: (err) => console.error('error', err),
        });
    } else {
      console.log('Form Data :', this.projectForm.value);

      this.projectService.addProject(name, description).subscribe({
        next: (newProject) => {
          this.projects.push(newProject); //  Add new one to the list
          this.resetForm(); //  Clear the form
        },
        error: (err) => console.error('Error ', err),
      });
    }
  }

  editProject(pro: Project): void {
    this.isEditMode = true;
    this.editingProjectId = pro.id;

    this.projectForm.setValue({
      name: pro.name,
      description: pro.description,
    });
    this.loadProjects();
  }

  cancelUpdate(): void {
    this.resetForm();
  }

  deleteProject(pro: Project): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete the Project ?'
    );

    if (!confirmDelete) return;

    if (this.isEditMode) {
      this.resetForm();
    }

    this.projectService.deleteProject(pro.id).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.id !== pro.id);

        alert('Project Deleted Successfully');
      },
      error: (err) => console.error('Delete Error Project ', err),
    });
  }
}
