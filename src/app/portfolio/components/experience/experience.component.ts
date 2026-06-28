import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { Experience } from '../../models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceItemComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <div class="text-center mb-12">
        <p class="section-label">Experience</p>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Work History</h2>
      </div>

      <div class="max-w-3xl mx-auto" *ngIf="experiences.length; else noExperience">
        <app-experience-item
          *ngFor="let exp of experiences; let i = index"
          [experience]="exp"
          [isLast]="i === experiences.length - 1"
        ></app-experience-item>
      </div>

      <ng-template #noExperience>
        <div class="glass-card max-w-md mx-auto p-8 text-center">
          <p class="text-slate-500">Experience details coming soon.</p>
        </div>
      </ng-template>
    </div>
  `,
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
