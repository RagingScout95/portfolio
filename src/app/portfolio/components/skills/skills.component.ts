import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-100 mb-12 text-center">
        Skills
      </h2>
      <div class="flex flex-wrap justify-center gap-3" *ngIf="skills.length; else noSkills">
        <span
          *ngFor="let skill of skills"
          class="px-4 py-2 bg-black border border-red-900/50 rounded-full text-gray-200 hover:border-red-600 transition-all duration-300"
        >
          {{ skill.name }}
        </span>
      </div>
      <ng-template #noSkills>
        <p class="text-gray-500 text-center">No skills listed yet.</p>
      </ng-template>
    </div>
  `,
  styles: []
})
export class SkillsComponent {
  @Input() skills: Skill[] = [];
}
