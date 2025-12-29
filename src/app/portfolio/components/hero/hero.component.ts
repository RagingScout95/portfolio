import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { SocialIconComponent } from '../ui/social-icon/social-icon.component';
import { SocialLink } from '../../models/portfolio.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SocialIconComponent],
  template: `
    <div class="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-black via-black to-black px-4 md:px-8 pt-20 md:pt-0">
      <div class="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <!-- Left Content -->
        <div class="flex-1 text-center md:text-left space-y-6">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 animate-fade-in">
            {{ name }}
          </h1>
          <p class="text-2xl md:text-3xl text-red-500 font-semibold">
            {{ role }}
          </p>
          <p class="text-lg md:text-xl text-gray-400 max-w-2xl">
            {{ tagline }}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <app-button
              label="View Projects"
              type="primary"
              (btnClick)="scrollToSection('projects')"
            ></app-button>
            <app-button
              label="Contact Me"
              type="secondary"
              (btnClick)="scrollToSection('contact')"
            ></app-button>
          </div>
          
          <!-- Social Icons -->
          <div class="flex gap-4 justify-center md:justify-start pt-4">
            <app-social-icon
              *ngFor="let link of socialLinks"
              [link]="link"
            ></app-social-icon>
          </div>
        </div>
        
        <!-- Right Content - Profile Image -->
        <div class="flex-shrink-0">
          <div class="relative">
            <div class="absolute inset-0 bg-red-600 rounded-full blur-3xl opacity-20"></div>
            <img
              [src]="photoUrl"
              [alt]="name"
              class="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-red-600 shadow-2xl shadow-red-600/50"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HeroComponent {
  @Input() name!: string;
  @Input() role!: string;
  @Input() tagline!: string;
  @Input() photoUrl!: string;
  @Input() socialLinks: SocialLink[] = [];

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}





