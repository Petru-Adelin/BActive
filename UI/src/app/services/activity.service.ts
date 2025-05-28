import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ActivityData {
  id: number;
  date: Date;
  caloriesBurned: number;
  caloriesObjective: number;
  activeMinutes: number;
  activeMinutesObjective: number;
  steps: number;
  stepsObjective: number;
  workouts: number;
  workoutsObjective: number;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities = new BehaviorSubject<ActivityData[]>([]);
  private currentId = 1;

  constructor() {
    // Initialize with some sample data
    const today = new Date();
    this.activities.next([
      {
        id: this.currentId++,
        date: today,
        caloriesBurned: 0,
        caloriesObjective: 2000,
        activeMinutes: 0,
        activeMinutesObjective: 60,
        steps: 0,
        stepsObjective: 10000,
        workouts: 0,
        workoutsObjective: 5
      }
    ]);
  }

  // Create
  addActivity(activity: Omit<ActivityData, 'id'>): ActivityData {
    const newActivity = { ...activity, id: this.currentId++ };
    const currentActivities = this.activities.value;
    this.activities.next([...currentActivities, newActivity]);
    return newActivity;
  }

  // Read
  getActivities(): Observable<ActivityData[]> {
    return this.activities.asObservable();
  }

  getTodayActivity(): Observable<ActivityData | undefined> {
    return new Observable(subscriber => {
      this.activities.subscribe(activities => {
        const today = new Date();
        const todayActivity = activities.find(activity => 
          activity.date.toDateString() === today.toDateString()
        );
        subscriber.next(todayActivity);
      });
    });
  }

  // Update
  updateActivity(id: number, updates: Partial<ActivityData>): ActivityData | undefined {
    const currentActivities = this.activities.value;
    const index = currentActivities.findIndex(activity => activity.id === id);
    
    if (index === -1) return undefined;

    const updatedActivity = { ...currentActivities[index], ...updates };
    currentActivities[index] = updatedActivity;
    this.activities.next([...currentActivities]);
    return updatedActivity;
  }

  // Delete
  deleteActivity(id: number): boolean {
    const currentActivities = this.activities.value;
    const filteredActivities = currentActivities.filter(activity => activity.id !== id);
    
    if (filteredActivities.length === currentActivities.length) {
      return false;
    }

    this.activities.next(filteredActivities);
    return true;
  }
} 