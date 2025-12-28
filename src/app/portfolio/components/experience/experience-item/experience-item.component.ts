import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/portfolio.models';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative pl-8 pb-12 last:pb-0">
      <!-- Timeline Line -->
      <div class="absolute left-0 top-0 bottom-0 w-px bg-red-900/50"></div>
      
      <!-- Timeline Dot -->
      <div class="absolute left-0 top-2 w-3 h-3 -ml-1.5 rounded-full bg-red-600 ring-4 ring-black"></div>
      
      <!-- Content -->
      <div class="bg-black border border-red-900/50 rounded-xl shadow-lg p-6 hover:border-red-600 transition-all duration-300">
        <h3 class="text-2xl font-bold text-red-500 mb-2">
          {{ experience.role }}
        </h3>
        <p class="text-xl text-gray-300 mb-2">
          {{ experience.company }}
        </p>
        <p class="text-gray-500 text-sm mb-4">
          {{ experience.from }} - {{ experience.to }}
        </p>
        <ul class="space-y-2">
          <li
            *ngFor="let item of experience.description"
            class="text-gray-300 flex items-start"
          >
            <span class="text-red-500 mr-2 mt-1.5">•</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class ExperienceItemComponent {
  @Input() experience!: Experience;
}





