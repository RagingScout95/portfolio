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
        
        // Update document title dynamically
        document.title = `${this.profile.name} - Portfolio | ragingscout97`;
        
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
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', `${this.profile.name} (ragingscout97) - ${this.profile.tagline}. ${this.profile.about.substring(0, 100)}...`);

    // Update Open Graph tags
    this.updateMetaTag('property', 'og:title', `${this.profile.name} - Portfolio | ragingscout97`);
    this.updateMetaTag('property', 'og:description', `${this.profile.name} (ragingscout97) - ${this.profile.tagline}`);
    if (this.profile.photoUrl) {
      this.updateMetaTag('property', 'og:image', this.profile.photoUrl);
    }

    // Update Twitter tags
    this.updateMetaTag('name', 'twitter:title', `${this.profile.name} - Portfolio | ragingscout97`);
    this.updateMetaTag('name', 'twitter:description', `${this.profile.name} (ragingscout97) - ${this.profile.tagline}`);
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
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Create Person schema with gaming name
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: this.profile.name,
      alternateName: 'ragingscout97',
      jobTitle: this.profile.role,
      description: this.profile.tagline,
      image: this.profile.photoUrl,
      url: window.location.origin,
      sameAs: this.profile.socialLinks.map(link => link.url),
      knowsAbout: this.profile.skills.map(skill => skill.name),
      alumniOf: this.profile.education.map(edu => ({
        '@type': 'EducationalOrganization',
        name: edu.institute
      })),
      worksFor: this.profile.currentJob ? {
        '@type': 'Organization',
        name: this.profile.currentJob.company,
        jobTitle: this.profile.currentJob.title
      } : undefined
    };

    // Create WebSite schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${this.profile.name} - Portfolio | ragingscout97`,
      alternateName: 'ragingscout97 Portfolio',
      description: this.profile.tagline,
      url: window.location.origin,
      author: {
        '@type': 'Person',
        name: this.profile.name,
        alternateName: 'ragingscout97'
      },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: window.location.origin + '/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    };

    // Create Portfolio schema
    const portfolioSchema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': window.location.origin + '/#portfolio',
      name: `${this.profile.name} - Portfolio`,
      alternateName: 'ragingscout97 Portfolio',
      description: this.profile.about,
      creator: {
        '@type': 'Person',
        name: this.profile.name,
        alternateName: 'ragingscout97'
      },
      about: {
        '@type': 'Thing',
        name: 'Software Development Portfolio'
      },
      inLanguage: 'en-US',
      copyrightHolder: {
        '@type': 'Person',
        name: this.profile.name
      }
    };

    // Create ProfilePage schema
    const profilePageSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: this.profile.name,
        alternateName: 'ragingscout97',
        jobTitle: this.profile.role,
        description: this.profile.tagline,
        image: this.profile.photoUrl
      }
    };

    // Inject all schemas
    [personSchema, websiteSchema, portfolioSchema, profilePageSchema].forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }
}





