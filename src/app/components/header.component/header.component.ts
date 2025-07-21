import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showAnalyticsButtons = false;
  showProfileButtons = false;
  showProfileDropdown = false; //

  constructor(private router: Router, private _authService: AuthService) {
    console.log('Initial showProfileButtons:', this.showProfileButtons);
  }

  profileShow(): void {
    this._authService.login$.subscribe((login) => {
      this.showProfileButtons = login === true;
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showAnalyticsButtons = [
          '/app/analytics',
          '/app/analytics/taskanalytics',
          '/app/analytics/employeeanalytics',
          '/app/analytics/projectanalytics',
        ].includes(event.urlAfterRedirects);
      });

    this.profileShow();
  }

  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  gotoProfile(): void {
    console.log('profile worked bro');
    // this.router.navigate(['/profile']); // Optional navigation
    this.router.navigate(['app/profile']);
    this.showProfileDropdown = false;
  }

  logout(): void {
    this._authService.logout(); // if you have such a function
    this.showProfileDropdown = false;
    this.showProfileButtons = false;
    this.router.navigate(['/login']);
  }

  gotoAnalytics(page: string): void {
    this.router.navigate(['/app/analytics', page]);
  }
}
