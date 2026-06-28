import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/portfolio.models';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative pl-8" [class.pb-10]="!isLast">
      <div *ngIf="!isLast" class="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
      <div class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"></div>

      <div class="glass-card p-6 hover:border-indigo-500/30 transition-all duration-300">
        <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 class="text-xl font-bold text-slate-100">{{ experience.role }}</h3>
          <span class="text-sm text-indigo-400 font-medium">{{ experience.from }} – {{ experience.to }}</span>
        </div>
        <p class="text-slate-400 mb-4">{{ experience.company }}</p>
        <ul class="space-y-2" *ngIf="experience.description?.length">
          <li *ngFor="let item of experience.description" class="text-slate-300 flex items-start text-sm leading-relaxed">
            <span class="text-indigo-400 mr-2 mt-1">▸</span>
            <span>{{ item }}</span>
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
