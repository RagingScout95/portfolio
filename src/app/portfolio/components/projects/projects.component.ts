import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-12 min-h-full flex flex-col justify-center">
      <div class="text-center mb-8">
        <p class="hud-title">⟨ Mission Briefings ⟩</p>
        <h2 class="hud-heading mt-2">Projects</h2>
      </div>
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <app-project-card *ngFor="let project of projects; let i = index" [project]="project" class="stagger-item block" [style.animation-delay.ms]="i * 70"></app-project-card>
      </div>
    </div>
  `,
})
export class ProjectsComponent {
  @Input() projects: Project[] = [];
}
