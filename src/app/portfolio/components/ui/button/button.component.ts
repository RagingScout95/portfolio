import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      *ngIf="isLink && href"
      [href]="href"
      target="_blank"
      rel="noreferrer"
      [class]="buttonClasses"
    >
      {{ label }}
    </a>
    <button
      *ngIf="!isLink || !href"
      [class]="buttonClasses"
      (click)="onClick()"
    >
      {{ label }}
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() isLink = false;
  @Input() href?: string;
  @Output() btnClick = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block';
    
    const typeClasses = this.type === 'primary'
      ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-red-600/50'
      : 'border-2 border-gray-600 text-gray-100 hover:border-red-600 hover:text-red-500 hover:scale-105';

    return `${baseClasses} ${typeClasses}`;
  }

  onClick(): void {
    this.btnClick.emit();
  }
}





