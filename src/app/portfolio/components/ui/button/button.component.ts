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
      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-blue-500/50'
      : 'border-2 border-slate-600 text-slate-100 hover:border-blue-500 hover:text-blue-400 hover:scale-105';

    return `${baseClasses} ${typeClasses}`;
  }

  onClick(): void {
    this.btnClick.emit();
  }
}





