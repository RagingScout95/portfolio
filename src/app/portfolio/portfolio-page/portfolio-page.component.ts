import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { NavbarComponent, NavSection } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ContactComponent } from '../components/contact/contact.component';
import { BackToTopComponent } from '../components/ui/back-to-top/back-to-top.component';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';
import { PortfolioDataService } from '../services/portfolio-data.service';
import { Profile, Experience, Project } from '../models/portfolio.models';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    BackToTopComponent,
    RevealOnScrollDirective
  ],
  template: `
    <div class="bg-slate-950 text-slate-100 min-h-screen">
      <!-- Loading Indicator -->
      <div *ngIf="isLoading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
          <p class="text-slate-400">Loading portfolio data...</p>
        </div>
      </div>

      <!-- Main Content -->
      <div *ngIf="!isLoading">
        <!-- Navbar -->
        <app-navbar [sections]="sections"></app-navbar>
        
        <main>
          <!-- Hero Section -->
          <section id="hero">
            <app-hero
              [name]="profile.name"
              [role]="profile.role"
              [tagline]="profile.tagline"
              [photoUrl]="profile.photoUrl"
              [socialLinks]="profile.socialLinks"
            ></app-hero>
          </section>
          
          <!-- About Section -->
          <section id="about" appRevealOnScroll>
            <app-about [profile]="profile"></app-about>
          </section>
          
          <!-- Experience Section -->
          <section id="experience" appRevealOnScroll>
            <app-experience [experiences]="experiences"></app-experience>
          </section>
          
          <!-- Projects Section -->
          <section id="projects" appRevealOnScroll>
            <app-projects [projects]="projects"></app-projects>
          </section>
          
          <!-- Contact Section -->
          <section id="contact" appRevealOnScroll>
            <app-contact [socialLinks]="profile.socialLinks"></app-contact>
          </section>
        </main>
        
        <!-- Back to Top Button -->
        <app-back-to-top></app-back-to-top>
      </div>
    </div>
  `,
  styles: []
})
export class PortfolioPageComponent implements OnInit {
  profile!: Profile;
  experiences: Experience[] = [];
  projects: Project[] = [];
  isLoading = true;

  sections: NavSection[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(private portfolioDataService: PortfolioDataService) {}

  ngOnInit(): void {
    // Load data from service
    forkJoin({
      profile: this.portfolioDataService.getProfileWithSkills(),
      experiences: this.portfolioDataService.getExperiences(),
      projects: this.portfolioDataService.getProjects()
    }).subscribe({
      next: (data) => {
        this.profile = data.profile;
        this.experiences = data.experiences;
        this.projects = data.projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading portfolio data:', error);
        this.isLoading = false;
      }
    });
  }
}





