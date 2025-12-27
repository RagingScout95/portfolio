import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { Experience } from '../../models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceItemComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl md:text-5xl font-bold text-slate-100 mb-12 text-center">
        Experience
      </h2>
      
      <div class="max-w-4xl mx-auto">
        <app-experience-item
          *ngFor="let exp of experiences"
          [experience]="exp"
        ></app-experience-item>
      </div>
    </div>
  `,
  styles: []
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}





