import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common'; // ✅ import NgIf

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf], // ✅ include NgIf in imports
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showAnalyticsButtons = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Route changed to:', event.urlAfterRedirects);
        this.showAnalyticsButtons =
          event.urlAfterRedirects === '/analytics' ||
          event.urlAfterRedirects === '/analytics/taskanalytics' ||
          event.urlAfterRedirects === '/analytics/employeeanalytics' ||
          event.urlAfterRedirects === '/analytics/projectanalytics';
      });
  }

  gotoAnalytics(page: string): void {
    this.router.navigate(['/analytics', page]);
  }
}
