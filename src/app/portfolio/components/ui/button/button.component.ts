import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a *ngIf="isLink && href" [href]="href" target="_blank" rel="noreferrer" [class]="classes">{{ label }}</a>
    <button *ngIf="!isLink || !href" type="button" [class]="classes" (click)="btnClick.emit()">{{ label }}</button>
  `,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() isLink = false;
  @Input() href?: string;
  @Output() btnClick = new EventEmitter<void>();

  get classes(): string {
    return this.type === 'primary' ? 'hud-btn hud-btn-primary inline-flex' : 'hud-btn inline-flex';
  }
}
