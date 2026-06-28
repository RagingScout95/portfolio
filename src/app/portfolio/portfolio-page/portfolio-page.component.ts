import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { HudShellComponent } from '../components/hud/hud-shell.component';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ContactComponent } from '../components/contact/contact.component';
import { BackToTopComponent } from '../components/ui/back-to-top/back-to-top.component';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';
import { AmbientBackgroundComponent } from '../core/ambient/ambient-background.component';
import { TacticalMapComponent } from '../core/tactical-map/tactical-map.component';
import { PortfolioDataService } from '../services/portfolio-data.service';
import { NavSection } from '../components/navbar/navbar.component';
import { ScrollContainerService } from '../core/motion/scroll-container.service';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    AmbientBackgroundComponent,
    HudShellComponent,
    TacticalMapComponent,
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
    <app-ambient-background></app-ambient-background>

    <div class="relative z-10 cockpit-bg min-h-screen text-slate-200">
      <div *ngIf="isLoading" class="min-h-screen flex items-center justify-center">
        <div class="hud-panel p-8 text-center font-mono max-w-sm mx-4">
          <p class="hud-title mb-4">⟨ Sync ⟩</p>
          <p class="text-teal-400/90 text-sm mb-4 animate-pulse">SYNCING PERSONNEL DATA...</p>
          <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full w-2/3 bg-gradient-to-r from-teal-600 to-cyan-400 animate-pulse"></div>
          </div>
        </div>
      </div>

      <ng-container *ngIf="!isLoading">
        <app-hud-shell
          [sections]="sections"
          [activeSection]="activeSection"
          (mapOpen)="mapOpen = true"
          (navigateSection)="goToSection($event)"
        ></app-hud-shell>

        <main #mainScroll class="h-[calc(100vh-3.5rem)] mt-14 overflow-y-auto snap-y snap-mandatory scroll-smooth">
          <section id="hero" class="section-snap">
            <app-hero
              [name]="profile.name"
              [role]="profile.role"
              [tagline]="profile.tagline"
              [photoUrl]="profile.photoUrl"
              [socialLinks]="profile.socialLinks"
            ></app-hero>
          </section>

          <section id="about" class="section-snap flex items-center" appRevealOnScroll>
            <app-about [profile]="profile" mode="about-only" class="w-full"></app-about>
          </section>

          <section id="timeline" class="section-snap flex items-center" appRevealOnScroll>
            <app-about [profile]="profile" mode="timeline-only" class="w-full"></app-about>
          </section>

          <section id="experience" class="section-snap flex items-center" appRevealOnScroll>
            <app-experience [experiences]="experiences" class="w-full"></app-experience>
          </section>

          <section id="skills" class="section-snap flex items-center" appRevealOnScroll>
            <app-skills [skills]="profile.skills" class="w-full"></app-skills>
          </section>

          <section id="projects" class="section-snap" appRevealOnScroll>
            <app-projects [projects]="projects"></app-projects>
          </section>

          <section id="contact" class="section-snap flex items-center" appRevealOnScroll>
            <app-contact [socialLinks]="profile.socialLinks" class="w-full"></app-contact>
          </section>
        </main>

        <app-back-to-top></app-back-to-top>

        <app-tactical-map
          [open]="mapOpen"
          [sections]="sections"
          (closed)="mapOpen = false"
          (sectionSelected)="goToSection($event)"
        ></app-tactical-map>
      </ng-container>
    </div>
  `,
})
export class PortfolioPageComponent implements OnInit, AfterViewInit {
  @ViewChild('mainScroll') mainScrollRef!: ElementRef<HTMLElement>;

  profile!: Profile;
  projects: Project[] = [];
  experiences: Experience[] = [];
  isLoading = true;
  mapOpen = false;
  activeSection = 'hero';

  sections: NavSection[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'File' },
    { id: 'timeline', label: 'Journey' },
    { id: 'experience', label: 'Ops' },
    { id: 'skills', label: 'Modules' },
    { id: 'projects', label: 'Missions' },
    { id: 'contact', label: 'Comms' },
  ];

  constructor(
    private portfolioDataService: PortfolioDataService,
    private scrollContainer: ScrollContainerService
  ) {}

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
        if (this.profile.faviconUrl) this.updateFavicon(this.profile.faviconUrl);
      },
      error: () => { this.isLoading = false; }
    });
  }

  ngAfterViewInit(): void {
    const main = this.mainScrollRef?.nativeElement;
    if (main) {
      this.scrollContainer.register(main);
      main.addEventListener('scroll', () => this.updateActiveSection());
    }
  }

  goToSection(id: string): void {
    this.scrollContainer.scrollToId(id);
    this.activeSection = id;
  }

  private updateActiveSection(): void {
    const main = this.mainScrollRef?.nativeElement;
    if (!main) return;
    const y = main.scrollTop + 200;
    for (const s of this.sections) {
      const el = document.getElementById(s.id);
      if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
        this.activeSection = s.id;
        break;
      }
    }
  }

  private updateFavicon(url: string): void {
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.head.appendChild(link);
  }
}
