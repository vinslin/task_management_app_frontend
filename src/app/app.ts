import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainappComponent } from './components/mainapp/mainapp.component';
import { AuthService } from './services/authentication/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainappComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'task_management_app_frontend';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.broadcastStoredRole(); //app load ahana udane engine start panna
    this.authService.broadcastStoredLogin();
  }
}
