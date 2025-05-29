import { Component, inject, EventEmitter, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
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

  selectedFile: File | null = null;
  tempAvatar: string | null = null;
  showSaveMessage = false;

  ngOnInit() {
    // Load saved profile picture from localStorage if it exists
    const savedAvatar = localStorage.getItem('profileAvatar');
    if (savedAvatar) {
      this.profile.avatar = savedAvatar;
    }
  }

  triggerFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempAvatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (this.tempAvatar) {
      this.profile.avatar = this.tempAvatar;
      // Save the new profile picture to localStorage
      localStorage.setItem('profileAvatar', this.tempAvatar);
      this.tempAvatar = null;
      this.selectedFile = null;
      this.showSaveMessage = true;
      setTimeout(() => {
        this.showSaveMessage = false;
      }, 2000);
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