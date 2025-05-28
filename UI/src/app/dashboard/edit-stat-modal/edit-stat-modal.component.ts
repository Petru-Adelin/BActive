import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-stat-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-stat-modal.component.html',
  styleUrls: ['./edit-stat-modal.component.css']
})
export class EditStatModalComponent {
  @Input() statName: string = '';
  @Input() value: number = 0;
  @Output() save = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  currentValue: number = 0;

  ngOnInit() {
    this.currentValue = this.value;
  }

  incrementValue() {
    this.currentValue++;
  }

  decrementValue() {
    if (this.currentValue > 0) {
      this.currentValue--;
    }
  }

  onValueChange(value: number) {
    if (value < 0) {
      this.currentValue = 0;
    }
  }

  onSave() {
    this.save.emit(this.currentValue);
  }

  onClose() {
    this.close.emit();
  }
} 