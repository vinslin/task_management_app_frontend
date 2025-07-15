import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnChanges {
  @Input() completedTasks: number = 0;
  @Input() dueTasks: number = 0;
  @Input() onGoingTasks: number = 0;

  barChartType: ChartType = 'pie';

  barChartData: ChartConfiguration['data'] = {
    labels: ['Completed', 'Due', 'Ongoing'],
    datasets: [],
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  // ✅ Called only when @Input() values change
  ngOnChanges(changes: SimpleChanges): void {
    this.barChartData = {
      labels: ['Completed', 'Due', 'Ongoing'],
      datasets: [
        {
          label: 'Tasks',
          data: [this.completedTasks, this.dueTasks, this.onGoingTasks],
          backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        },
      ],
    };
  }
}
