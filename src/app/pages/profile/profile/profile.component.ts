import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  email: string = '';
  role: string = '';
  userName: string = '';

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.role = localStorage.getItem('role') || '';
    this.userName = localStorage.getItem('userName') || '';
  }
}
