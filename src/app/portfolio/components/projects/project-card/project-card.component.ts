import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { Project } from '../../../models/portfolio.models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="glass-card rounded-2xl p-6 h-full flex flex-col hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
      <div *ngIf="project.imageUrl" class="mb-4 -mx-2 -mt-2 rounded-xl overflow-hidden aspect-video bg-slate-800">
        <img [src]="resolveImageUrl(project.imageUrl)" [alt]="project.name" class="w-full h-full object-cover" loading="lazy" />
      </div>

      <h3 class="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">
        {{ project.name }}
      </h3>

      <p class="text-slate-400 text-sm mb-4 flex-grow leading-relaxed line-clamp-4">
        {{ project.description || 'No description provided.' }}
      </p>

      <div class="flex flex-wrap gap-2 mb-5">
        <span
          *ngFor="let tech of project.techStack"
          class="px-2.5 py-1 rounded-md text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
        >
          {{ tech }}
        </span>
      </div>

      <div class="flex flex-wrap gap-2 mt-auto">
        <app-button
          *ngIf="hasLiveUrl()"
          label="Live Demo"
          type="primary"
          [isLink]="true"
          [href]="project.liveUrl || project.demoUrl"
        ></app-button>
        <app-button
          *ngIf="hasGithubUrl()"
          label="GitHub"
          type="secondary"
          [isLink]="true"
          [href]="project.githubUrl"
        ></app-button>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() project!: Project;

  resolveImageUrl(url: string): string {
    if (url.startsWith('http')) return url;
    if (url.startsWith('/api/')) return environment.apiUrl.replace('/api', '') + url;
    return url;
  }

  hasLiveUrl(): boolean {
    return !!(this.project.liveUrl?.trim() || this.project.demoUrl?.trim());
  }

  hasGithubUrl(): boolean {
    return !!(this.project.githubUrl?.trim());
  }
}
