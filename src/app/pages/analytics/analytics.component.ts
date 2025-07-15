import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  constructor(private router: Router,
  ) {}
  
}
