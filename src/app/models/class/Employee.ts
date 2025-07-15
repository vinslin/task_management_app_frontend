import { IEmployee } from '../interfaces/IEmployee';

export class Employee implements IEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;

  constructor() {
    (this.id = ''),
      (this.name = ''),
      (this.email = ''),
      (this.role = ''),
      (this.createdAt = '');
  }
}
