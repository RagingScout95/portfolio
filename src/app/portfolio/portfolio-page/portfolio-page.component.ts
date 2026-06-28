import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { NavbarComponent, NavSection } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ContactComponent } from '../components/contact/contact.component';
import { BackToTopComponent } from '../components/ui/back-to-top/back-to-top.component';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';
import { PortfolioDataService } from '../services/portfolio-data.service';
import { Profile, Project, Experience } from '../models/portfolio.models';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    BackToTopComponent,
    RevealOnScrollDirective
  ],
  template: `
    <div class="bg-slate-950 text-slate-100 min-h-screen">
      <div *ngIf="isLoading" class="flex items-center justify-center min-h-screen hero-mesh">
        <div class="text-center">
          <div class="inline-block w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-slate-400 text-sm">Loading portfolio...</p>
        </div>
      </div>

      <div *ngIf="!isLoading">
        <app-navbar
          [sections]="sections"
          [brandText]="'ragingscout97'"
          [faviconUrl]="profile.faviconUrl"
        ></app-navbar>

        <main>
          <section id="hero">
            <app-hero
              [name]="profile.name"
              [role]="profile.role"
              [tagline]="profile.tagline"
              [photoUrl]="profile.photoUrl"
              [socialLinks]="profile.socialLinks"
            ></app-hero>
          </section>

          <section id="about" appRevealOnScroll>
            <app-about [profile]="profile" mode="about-only"></app-about>
          </section>

          <section id="timeline" appRevealOnScroll>
            <app-about [profile]="profile" mode="timeline-only"></app-about>
          </section>

          <section id="experience" appRevealOnScroll>
            <app-experience [experiences]="experiences"></app-experience>
          </section>

          <section id="skills" appRevealOnScroll>
            <app-skills [skills]="profile.skills"></app-skills>
          </section>

          <section id="projects" appRevealOnScroll>
            <app-projects [projects]="projects"></app-projects>
          </section>

          <section id="contact" appRevealOnScroll>
            <app-contact [socialLinks]="profile.socialLinks"></app-contact>
          </section>
        </main>

        <app-back-to-top></app-back-to-top>
      </div>
    </div>
  `,
})
export class PortfolioPageComponent implements OnInit {
  profile!: Profile;
  projects: Project[] = [];
  experiences: Experience[] = [];
  isLoading = true;

  sections: NavSection[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Journey' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(private portfolioDataService: PortfolioDataService) {}

  ngOnInit(): void {
    forkJoin({
      profile: this.portfolioDataService.getProfileWithSkills(),
      projects: this.portfolioDataService.getProjects(),
      experiences: this.portfolioDataService.getExperiences()
    }).subscribe({
      next: data => {
        this.profile = data.profile;
        this.projects = data.projects;
        this.experiences = data.experiences;
        this.isLoading = false;
        document.title = `${this.profile.name} | ${this.profile.role}`;
        this.updateMetaTags();
        if (this.profile.faviconUrl) {
          this.updateFavicon(this.profile.faviconUrl);
        }
      },
      error: err => {
        console.error('Error loading portfolio data:', err);
        this.isLoading = false;
      }
    });
  }

  private updateMetaTags(): void {
    const description = `${this.profile.name} — ${this.profile.role}. ${this.profile.tagline}`;
    this.setMeta('name', 'description', description);
    this.setMeta('property', 'og:title', `${this.profile.name} | Portfolio`);
    this.setMeta('property', 'og:description', description);
    this.setMeta('property', 'og:url', 'https://ragingscout97.in/');
  }

  private setMeta(attr: string, key: string, content: string): void {
    let meta = document.querySelector(`meta[${attr}="${key}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, key);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  private updateFavicon(faviconUrl: string): void {
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  }
}
