import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <div class="text-center mb-12">
        <p class="section-label">Expertise</p>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Skills & Technologies</h2>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto">Tools and technologies I work with to build reliable software.</p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto" *ngIf="skills.length; else noSkills">
        <span
          *ngFor="let skill of skills; let i = index"
          class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 stagger-item"
          [style.animation-delay.ms]="i * 50"
        >
          {{ skill.name }}
        </span>
      </div>

      <ng-template #noSkills>
        <div class="glass-card max-w-md mx-auto p-8 text-center">
          <p class="text-slate-500">Skills coming soon — add them via the admin dashboard.</p>
        </div>
      </ng-template>
    </div>
  `,
})
export class SkillsComponent {
  @Input() skills: Skill[] = [];
}
