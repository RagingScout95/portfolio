import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
      <div class="text-center mb-8">
        <p class="hud-title">⟨ Installed Modules ⟩</p>
        <h2 class="hud-heading mt-2">Skills</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto" *ngIf="skills.length; else noSkills">
        <span
          *ngFor="let skill of skills; let i = index"
          class="font-mono text-xs px-3 py-2 border border-teal-500/25 bg-teal-500/5 text-teal-200/90 stagger-item"
          [style.animation-delay.ms]="i * 40"
        >[ {{ skill.name }} ]</span>
      </div>
      <ng-template #noSkills>
        <div class="hud-panel p-8 text-center max-w-md mx-auto text-slate-500">No modules loaded yet.</div>
      </ng-template>
    </div>
  `,
})
export class SkillsComponent {
  @Input() skills: Skill[] = [];
}
