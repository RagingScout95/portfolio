import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { Experience } from '../../models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceItemComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
      <div class="text-center mb-8">
        <p class="hud-title">⟨ Operations Record ⟩</p>
        <h2 class="hud-heading mt-2">Experience</h2>
      </div>
      <div class="max-w-3xl mx-auto" *ngIf="experiences.length; else noExp">
        <app-experience-item *ngFor="let exp of experiences; let i = index" [experience]="exp" [isLast]="i === experiences.length - 1"></app-experience-item>
      </div>
      <ng-template #noExp>
        <div class="hud-panel p-8 text-center max-w-md mx-auto text-slate-500">Ops record pending.</div>
      </ng-template>
    </div>
  `,
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
