import { IProject } from '../interfaces/IProject';

export class Project implements IProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;

  constructor() {
    (this.id = ''),
      (this.name = ''),
      (this.description = ''),
      (this.createdAt = '');
  }
}
