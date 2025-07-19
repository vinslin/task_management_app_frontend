import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  userName: string;
  email: string;
  passWord: string;
  role: string;

  constructor() {
    (this.userName = ''),
      (this.email = ''),
      (this.passWord = ''),
      (this.role = '');
  }
}
