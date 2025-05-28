import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ActivityService, ActivityData } from '../services/activity.service';
import { CommonModule } from '@angular/common';
import { EditStatModalComponent } from './edit-stat-modal/edit-stat-modal.component';
import { StatsComponent } from '../stats/stats.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    EditStatModalComponent, 
    RouterModule,
    StatsComponent,
    ProfileComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  activityService = inject(ActivityService);

  todayActivity: ActivityData | undefined;
  showModal = false;
  showStats = false;
  showProfile = false;
  editingStat: {
    name: string;
    value: number;
    field: keyof Omit<ActivityData, 'id' | 'date'>;
  } | null = null;

  ngOnInit() {
    this.loadTodayActivity();
  }

  loadTodayActivity() {
    this.activityService.getTodayActivity().subscribe(activity => {
      if (activity) {
        this.todayActivity = activity;
      } else {
        const newActivity = this.activityService.addActivity({
          date: new Date(),
          caloriesBurned: 0,
          caloriesObjective: 2000,
          activeMinutes: 0,
          activeMinutesObjective: 60,
          steps: 0,
          stepsObjective: 10000,
          workouts: 0,
          workoutsObjective: 5
        });
        this.todayActivity = newActivity;
      }
    });
  }

  getProgressPercentage(current: number, objective: number): number {
    return Math.min(Math.round((current / objective) * 100), 100);
  }

  openEditModal(statName: string, value: number, field: keyof Omit<ActivityData, 'id' | 'date'>) {
    this.editingStat = { name: statName, value, field };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingStat = null;
  }

  saveStatValue(newValue: number) {
    if (this.todayActivity && this.editingStat) {
      const updates = { [this.editingStat.field]: newValue };
      this.activityService.updateActivity(this.todayActivity.id, updates);
      this.closeModal();
      this.loadTodayActivity();
    }
  }

  toggleStats() {
    this.showStats = !this.showStats;
    if (this.showStats) this.showProfile = false;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
    if (this.showProfile) this.showStats = false;
  }

  closeProfile() {
    this.showProfile = false;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
