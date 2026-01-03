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
    <div class="bg-black text-gray-100 min-h-screen">
      <!-- Loading Indicator -->
      <div *ngIf="isLoading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
          <p class="text-gray-400">Loading portfolio data...</p>
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
        
        // Update document title dynamically - prioritize ragingscout97 for SEO
        document.title = `ragingscout97 - Portfolio | ${this.profile.name} | ${this.profile.role}`;
        
        // Update meta description dynamically
        this.updateMetaTags();
        
        // Update favicon dynamically if available
        if (this.profile.faviconUrl) {
          this.updateFavicon(this.profile.faviconUrl);
        }
        
        // Add structured data for SEO
        this.addStructuredData();
      },
      error: (error) => {
        console.error('Error loading portfolio data:', error);
        this.isLoading = false;
      }
    });
  }

  private updateMetaTags(): void {
    // Update meta description - prioritize ragingscout97 for SEO
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', `ragingscout97 - Portfolio of ${this.profile.name}. ${this.profile.role}. ${this.profile.tagline}. Visit ragingscout97.in`);

    // Update Open Graph tags
    this.updateMetaTag('property', 'og:title', `ragingscout97 - Portfolio | ${this.profile.name} | ${this.profile.role}`);
    this.updateMetaTag('property', 'og:description', `ragingscout97 - Portfolio of ${this.profile.name}. ${this.profile.role}. ${this.profile.tagline}. Visit ragingscout97.in`);
    this.updateMetaTag('property', 'og:url', 'https://ragingscout97.in/');
    if (this.profile.photoUrl) {
      this.updateMetaTag('property', 'og:image', this.profile.photoUrl);
    }

    // Update Twitter tags
    this.updateMetaTag('name', 'twitter:title', `ragingscout97 - Portfolio | ${this.profile.name} | ${this.profile.role}`);
    this.updateMetaTag('name', 'twitter:description', `ragingscout97 - Portfolio of ${this.profile.name}. ${this.profile.role}. Visit ragingscout97.in`);
    this.updateMetaTag('name', 'twitter:url', 'https://ragingscout97.in/');
    if (this.profile.photoUrl) {
      this.updateMetaTag('name', 'twitter:image', this.profile.photoUrl);
    }
  }

  private updateMetaTag(attribute: string, value: string, content: string): void {
    let meta = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, value);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  private updateFavicon(faviconUrl: string): void {
    // Remove existing favicons
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach(icon => icon.remove());
    
    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  }

  private addStructuredData(): void {
    // Update the existing Person schema in HTML with dynamic data if needed
    // The main structured data is already in index.html for better SEO
    // This method can be used to enhance it with dynamic profile data if required
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript && this.profile.photoUrl) {
      try {
        const schema = JSON.parse(existingScript.textContent || '{}');
        // Update image if profile has a photo
        if (this.profile.photoUrl && schema.image) {
          schema.image = this.profile.photoUrl;
          existingScript.textContent = JSON.stringify(schema);
        }
      } catch (e) {
        console.warn('Could not update structured data:', e);
      }
    }
  }
}





