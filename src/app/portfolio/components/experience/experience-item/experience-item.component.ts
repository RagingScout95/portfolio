import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/portfolio.models';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative pl-8" [class.pb-8]="!isLast">
      <div *ngIf="!isLast" class="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-teal-500/40 to-transparent"></div>
      <div class="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-teal-400 ring-4 ring-teal-500/20"></div>
      <div class="game-content-panel p-6">
        <div class="flex flex-wrap justify-between gap-2 mb-2">
          <h3 class="text-lg font-bold text-slate-100 font-[Rajdhani] uppercase tracking-wide">{{ experience.role }}</h3>
          <span class="text-xs font-mono text-teal-400/80">{{ experience.from }} – {{ experience.to }}</span>
        </div>
        <p class="text-slate-400 mb-3">{{ experience.company }}</p>
        <ul class="space-y-2" *ngIf="experience.description?.length">
          <li *ngFor="let item of experience.description" class="text-sm text-slate-300 flex gap-2">
            <span class="text-teal-500">▸</span><span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class ExperienceItemComponent {
  @Input() experience!: Experience;
  @Input() isLast = false;
}
