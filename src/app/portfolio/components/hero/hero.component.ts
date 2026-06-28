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
    <section class="hero-mesh relative min-h-screen flex items-center overflow-hidden pt-20">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse-glow" style="animation-delay: 2s"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full py-16 md:py-24">
        <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div class="flex-1 text-center md:text-left space-y-6 animate-fade-in-up">
            <p class="section-label md:text-left text-center">Portfolio</p>
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight">
              Hi, I'm
              <span class="block mt-1 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {{ name }}
              </span>
            </h1>
            <p class="text-xl md:text-2xl text-indigo-300 font-medium">{{ role }}</p>
            <p class="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">{{ tagline }}</p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
              <app-button label="View Projects" type="primary" (btnClick)="scrollToSection('projects')"></app-button>
              <app-button label="Get in Touch" type="secondary" (btnClick)="scrollToSection('contact')"></app-button>
            </div>

            <div class="flex gap-3 justify-center md:justify-start pt-4" *ngIf="socialLinks.length">
              <app-social-icon *ngFor="let link of socialLinks" [link]="link"></app-social-icon>
            </div>
          </div>

          <div class="flex-shrink-0 animate-fade-in" style="animation-delay: 0.2s">
            <div class="relative">
              <div class="absolute -inset-4 bg-gradient-to-r from-indigo-600/30 to-violet-600/30 rounded-full blur-2xl animate-float"></div>
              <img
                [src]="photoUrl"
                [alt]="name + ' - ' + role"
                loading="eager"
                fetchpriority="high"
                width="320"
                height="320"
                class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl object-cover border border-white/20 shadow-2xl shadow-indigo-500/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
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
