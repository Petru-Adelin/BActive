import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface DailyStats {
  date: Date;
  caloriesBurned: number;
  workouts: number;
  activeMinutes: number;
  steps: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class CalendarComponent implements OnInit {
  selectedDate: Date = new Date();
  dailyStats: DailyStats | null = null;
  mockData: DailyStats[] = [];

  constructor(private router: Router) {
    this.generateMockData();
  }

  ngOnInit(): void {
    // Set initial stats for today
    this.onDateSelected(this.selectedDate);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      const hasData = this.mockData.some(stat => 
        stat.date.getDate() === date && 
        stat.date.getMonth() === cellDate.getMonth() &&
        stat.date.getFullYear() === cellDate.getFullYear()
      );
      return hasData ? 'has-data' : '';
    }
    return '';
  };

  onDateSelected(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.dailyStats = this.mockData.find(stat => 
        stat.date.getDate() === date.getDate() &&
        stat.date.getMonth() === date.getMonth() &&
        stat.date.getFullYear() === date.getFullYear()
      ) || null;
    }
  }

  private generateMockData(): void {
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate random stats
      this.mockData.push({
        date: date,
        caloriesBurned: Math.floor(Math.random() * 2000) + 500,
        workouts: Math.floor(Math.random() * 3),
        activeMinutes: Math.floor(Math.random() * 120) + 30,
        steps: Math.floor(Math.random() * 10000) + 5000
      });
    }
  }
} 