import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MainappComponent } from './components/mainapp/mainapp.component';
import { AuthService } from './services/authentication/auth.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainappComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'task_management_app_frontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //broadcast start pannurathu
    this.authService.broadcastStoredRole(); //app load ahana udane engine start panna
    this.authService.broadcastStoredLogin();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;

        const publicRoutes = ['/signup', '/login'];

        if (
          !publicRoutes.includes(currentUrl) &&
          this.authService.isTokenExpired()
        ) {
          //const publicRoutes = ['/signup', '/login'];
          if (!this.authService.wasManuallyLoggedOut())
            alert('Session Expired . Please login again.');

          this.authService.setManualLoggedOut(false);
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });
  }
}
