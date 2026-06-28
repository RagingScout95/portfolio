import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a *ngIf="isLink && href" [href]="href" target="_blank" rel="noreferrer" [class]="buttonClasses">
      {{ label }}
    </a>
    <button *ngIf="!isLink || !href" type="button" [class]="buttonClasses" (click)="onClick()">
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() isLink = false;
  @Input() href?: string;
  @Output() btnClick = new EventEmitter<void>();

  get buttonClasses(): string {
    const base = 'inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300';
    return this.type === 'primary'
      ? `${base} bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5`
      : `${base} border border-white/20 text-slate-200 hover:border-indigo-500/50 hover:text-indigo-300 hover:-translate-y-0.5`;
  }

  onClick(): void {
    this.btnClick.emit();
  }
}
