import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <div class="text-center mb-12">
        <p class="section-label">Portfolio</p>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Featured Projects</h2>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto">A selection of things I've built — from games to full-stack apps.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <app-project-card
          *ngFor="let project of projects; let i = index"
          [project]="project"
          [style.animation-delay.ms]="i * 80"
          class="stagger-item block"
        ></app-project-card>
      </div>
    </div>
  `,
})
export class ProjectsComponent {
  @Input() projects: Project[] = [];
}
