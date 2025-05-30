import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ActivityService, ActivityData } from '../services/activity.service';
import { CommonModule } from '@angular/common';
import { EditStatModalComponent } from './edit-stat-modal/edit-stat-modal.component';
import { StatsComponent } from '../stats/stats.component';
import { ProfileComponent } from '../profile/profile.component';
import { StatsHTTPService } from '../services/stats-http.service';

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
  http = inject(StatsHTTPService)

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

  getWeeklyStats(){

    // YOU MUST PROVIDE ME 2 DATES FOR THE WEEK ALWAYS THE PREVIOUS WEEK 
    // LOOK AT THE CURRENT DATE AND COMPUTE THE PREV WEEK
    this.http.getWeeklyStats('2024-01-04', '2024-01-10', 3).subscribe(resp => {
      const j_data = JSON.parse(resp)

      // the data is like in Calendar just now there are 7 entries
      // YOU MUST EMBEDD THEM IN THE UI
      for(let entry of j_data){
        const fields = entry['fields']
        const active_minutes = fields['active_minutes']
        const calories = fields['calories']
        const steps = fields['steps']
        const workouts = fields['workouts']
        console.log(steps)
      }
    })
  }

  getYearlyStats(){
    
    const currentYear = new Date().getFullYear() - 1
    const user_id = 3

    // THE SAME AS FOR THE WEEK JUST YOU HAVE 366 ENTRIES
    this.http.getYearlyStats(currentYear, user_id).subscribe(resp => {
      const j_data = JSON.parse(resp)

      for(const entry of j_data){
        const fields = entry['fields']
        const active_minutes = fields['active_minutes']
        const calories = fields['calories']
        const steps = fields['steps']
        const workouts = fields['workouts']
      }
    })

  }
}
