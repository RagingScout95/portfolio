import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl md:text-5xl font-bold text-slate-100 mb-12 text-center">
        About Me
      </h2>
      
      <div class="space-y-12">
        <!-- About Text -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-8">
          <p class="text-lg text-slate-300 leading-relaxed">
            {{ profile.about }}
          </p>
        </div>
        
        <!-- Education -->
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-slate-100 mb-6">
            Education
          </h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              *ngFor="let edu of profile.education"
              class="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 hover:border-blue-500 transition-all duration-300"
            >
              <h4 class="text-xl font-semibold text-blue-400 mb-2">
                {{ edu.degree }}
              </h4>
              <p class="text-slate-300 mb-1">{{ edu.institute }}</p>
              <p class="text-slate-500 text-sm">{{ edu.year }}</p>
            </div>
          </div>
        </div>
        
        <!-- Skills -->
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-slate-100 mb-6">
            Skills & Technologies
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              *ngFor="let skill of profile.skills"
              class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-200 hover:bg-slate-700 hover:border-blue-500 transition-all duration-300"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
        
        <!-- Current Job -->
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-slate-100 mb-6">
            Currently Working At
          </h3>
          <div class="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-800 rounded-xl shadow-lg p-8">
            <h4 class="text-2xl font-bold text-blue-400 mb-2">
              {{ profile.currentJob.title }}
            </h4>
            <p class="text-xl text-slate-300 mb-3">
              {{ profile.currentJob.company }}
            </p>
            <p class="text-slate-500 text-sm mb-4">
              Since {{ profile.currentJob.since }}
            </p>
            <p class="text-slate-300 leading-relaxed">
              {{ profile.currentJob.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {
  @Input() profile!: Profile;
}





