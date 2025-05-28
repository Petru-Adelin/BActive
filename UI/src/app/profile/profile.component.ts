import { Component, inject, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  router = inject(Router);

  profile = {
    name: 'Blaj Andrei',
    email: 'blajandrei04@gmail.com',
    phone: '0745989117',
    location: 'Romania',
    avatar: 'assets/profilBlaj.jpeg'
  };

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  closeProfile() {
    this.close.emit();
  }
} 