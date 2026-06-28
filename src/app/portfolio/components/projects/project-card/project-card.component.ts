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
    <div class="hud-panel p-5 h-full flex flex-col hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300">
      <p class="hud-title mb-2">Mission</p>
      <h3 class="text-lg font-[Rajdhani] font-bold uppercase tracking-wide text-slate-100 mb-2">{{ project.name }}</h3>
      <p class="text-slate-400 text-sm flex-grow leading-relaxed mb-4">{{ project.description || 'Classified briefing pending.' }}</p>
      <div class="flex flex-wrap gap-1.5 mb-4">
        <span *ngFor="let tech of project.techStack" class="font-mono text-[10px] px-2 py-0.5 border border-teal-500/20 text-teal-300/80">{{ tech }}</span>
      </div>
      <div class="flex flex-wrap gap-2 mt-auto">
        <app-button *ngIf="hasLiveUrl()" label="Live" type="primary" [isLink]="true" [href]="project.liveUrl || project.demoUrl"></app-button>
        <app-button *ngIf="hasGithubUrl()" label="Source" type="secondary" [isLink]="true" [href]="project.githubUrl"></app-button>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() project!: Project;

  hasLiveUrl(): boolean {
    return !!(this.project.liveUrl?.trim() || this.project.demoUrl?.trim());
  }

  hasGithubUrl(): boolean {
    return !!(this.project.githubUrl?.trim());
  }
}
