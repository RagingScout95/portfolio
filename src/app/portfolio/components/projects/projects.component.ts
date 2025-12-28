import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-100 mb-12 text-center">
        Projects
      </h2>
      
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <app-project-card
          *ngFor="let project of projects"
          [project]="project"
        ></app-project-card>
      </div>
    </div>
  `,
  styles: []
})
export class ProjectsComponent {
  @Input() projects: Project[] = [];
}





