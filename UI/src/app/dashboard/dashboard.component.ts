import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  router=inject(Router);

  logout(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

}
