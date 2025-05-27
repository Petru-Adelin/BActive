import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  router = inject(Router);

  profile = {
    name: 'Blaj Andrei',
    email: 'blajandrei04@gmail.com',
    phone: '0745989117',
    location: 'Romania'
  };

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  closeProfile() {
    this.router.navigate(['/dashboard']);
  }
} 