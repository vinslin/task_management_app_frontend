import { Component, Input } from '@angular/core';
import { IProject } from '../../../models/interfaces/IProject';
import { Project } from '../../../models/class/Project';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-details',
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent {
  @Input() currentProject: IProject = new Project();
}
