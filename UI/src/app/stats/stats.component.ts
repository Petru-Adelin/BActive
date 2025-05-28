import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatButtonToggleModule
  ]
})
export class StatsComponent implements OnInit {
  viewType: 'week' | 'year' = 'week';
  
  // Weekly data
  private weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private weeklySteps = [8500, 9200, 7800, 10000, 8900, 7500, 9500];
  private weeklyCalories = [1800, 2100, 1900, 2200, 2000, 1700, 2300];
  private weeklyProgress = [75, 82, 68, 90, 85, 70, 88];

  // Yearly data
  private yearlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private yearlySteps = [280000, 265000, 290000, 275000, 300000, 285000, 295000, 310000, 290000, 275000, 265000, 280000];
  private yearlyCalories = [56000, 53000, 58000, 55000, 60000, 57000, 59000, 62000, 58000, 55000, 53000, 56000];
  private yearlyProgress = [82, 78, 85, 80, 88, 83, 86, 90, 85, 81, 79, 83];

  // Steps Chart
  public stepsChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.weeklyLabels,
    datasets: [
      {
        data: this.weeklySteps,
        label: 'Steps',
        fill: true,
        tension: 0.4,
        borderColor: '#43d167',
        backgroundColor: 'rgba(67, 209, 103, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#43d167'
      }
    ]
  };

  public stepsChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  // Calories Chart
  public caloriesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.weeklyLabels,
    datasets: [
      {
        data: this.weeklyCalories,
        label: 'Calories',
        backgroundColor: '#43d167',
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  };

  public caloriesChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  // Activity Distribution Chart
  public activityChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Steps', 'Calories', 'Active Minutes', 'Workouts'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          '#43d167',
          '#2196F3',
          '#FFC107',
          '#FF5722'
        ],
        borderWidth: 0
      }
    ]
  };

  public activityChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11
          },
          color: 'rgba(255, 255, 255, 0.9)'
        }
      },
      title: {
        display: false
      }
    },
    cutout: '70%'
  };

  // Weekly Progress Chart
  public progressChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.weeklyLabels,
    datasets: [
      {
        data: this.weeklyProgress,
        label: 'Daily Goals',
        fill: true,
        tension: 0.4,
        borderColor: '#43d167',
        backgroundColor: 'rgba(67, 209, 103, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#43d167'
      }
    ]
  };

  public progressChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  // Stats Table
  displayedColumns: string[] = ['metric', 'average', 'best', 'total'];
  statsData = [
    { metric: 'Steps', average: '8,900', best: '10,000', total: '62,300' },
    { metric: 'Calories', average: '2,000', best: '2,300', total: '14,000' },
    { metric: 'Active Minutes', average: '45', best: '60', total: '315' },
    { metric: 'Workouts', average: '4', best: '5', total: '28' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize with weekly view
    this.updateView('week');
  }

  onViewChange(event: MatButtonToggleChange): void {
    this.updateView(event.value);
  }

  private updateView(view: 'week' | 'year'): void {
    this.viewType = view;
    
    // Update Steps Chart
    this.stepsChartData.labels = view === 'week' ? this.weeklyLabels : this.yearlyLabels;
    this.stepsChartData.datasets[0].data = view === 'week' ? this.weeklySteps : this.yearlySteps;

    // Update Calories Chart
    this.caloriesChartData.labels = view === 'week' ? this.weeklyLabels : this.yearlyLabels;
    this.caloriesChartData.datasets[0].data = view === 'week' ? this.weeklyCalories : this.yearlyCalories;

    // Update Progress Chart
    this.progressChartData.labels = view === 'week' ? this.weeklyLabels : this.yearlyLabels;
    this.progressChartData.datasets[0].data = view === 'week' ? this.weeklyProgress : this.yearlyProgress;

    // Update stats table data
    if (view === 'week') {
      this.statsData = [
        { metric: 'Steps', average: '8,900', best: '10,000', total: '62,300' },
        { metric: 'Calories', average: '2,000', best: '2,300', total: '14,000' },
        { metric: 'Active Minutes', average: '45', best: '60', total: '315' },
        { metric: 'Workouts', average: '4', best: '5', total: '28' }
      ];
    } else {
      this.statsData = [
        { metric: 'Steps', average: '285,000', best: '310,000', total: '3,420,000' },
        { metric: 'Calories', average: '57,000', best: '62,000', total: '684,000' },
        { metric: 'Active Minutes', average: '1,350', best: '1,800', total: '16,200' },
        { metric: 'Workouts', average: '120', best: '150', total: '1,440' }
      ];
    }
  }
} 