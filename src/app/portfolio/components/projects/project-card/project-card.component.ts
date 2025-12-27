import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { Project } from '../../../models/portfolio.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300 flex flex-col h-full">
      <h3 class="text-2xl font-bold text-blue-400 mb-3">
        {{ project.name }}
      </h3>
      
      <p class="text-slate-300 mb-4 flex-grow">
        {{ project.description }}
      </p>
      
      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          *ngFor="let tech of project.techStack"
          class="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300"
        >
          {{ tech }}
        </span>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex gap-3 mt-auto">
        <app-button
          *ngIf="project.liveUrl"
          [label]="'Live Demo'"
          [type]="'primary'"
          [isLink]="true"
          [href]="project.liveUrl"
        ></app-button>
        <app-button
          *ngIf="project.githubUrl"
          [label]="'GitHub'"
          [type]="'secondary'"
          [isLink]="true"
          [href]="project.githubUrl"
        ></app-button>
      </div>
    </div>
  `,
  styles: []
})
export class ProjectCardComponent {
  @Input() project!: Project;
}





