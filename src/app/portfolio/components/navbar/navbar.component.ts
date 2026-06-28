import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex items-center justify-between h-16">
          <a
            href="#hero"
            (click)="scrollToSection($event, 'hero')"
            class="flex items-center gap-2 text-lg font-bold tracking-tight group"
          >
            <img
              *ngIf="faviconUrl"
              [src]="faviconUrl"
              [alt]="brandText"
              class="w-7 h-7 rounded object-contain"
            />
            <span class="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-violet-300 transition-all">
              {{ brandText }}
            </span>
          </a>

          <div class="hidden md:flex items-center gap-1">
            <a
              *ngFor="let section of sections"
              [href]="'#' + section.id"
              (click)="scrollToSection($event, section.id)"
              [class]="getLinkClasses(section.id)"
            >
              {{ section.label }}
            </a>
          </div>

          <button
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            <svg *ngIf="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg *ngIf="mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div *ngIf="mobileMenuOpen" class="md:hidden py-3 space-y-1 border-t border-white/10">
          <a
            *ngFor="let section of sections"
            [href]="'#' + section.id"
            (click)="scrollToSection($event, section.id); closeMobileMenu()"
            [class]="getMobileLinkClasses(section.id)"
          >
            {{ section.label }}
          </a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  @Input() sections: NavSection[] = [];
  @Input() brandText = 'Portfolio';
  @Input() faviconUrl?: string;

  activeSection = 'hero';
  mobileMenuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + 120;
    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section.id;
          break;
        }
      }
    }
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getLinkClasses(sectionId: string): string {
    const base = 'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300';
    return this.activeSection === sectionId
      ? `${base} text-indigo-400 bg-indigo-500/10`
      : `${base} text-slate-400 hover:text-indigo-300 hover:bg-white/5`;
  }

  getMobileLinkClasses(sectionId: string): string {
    const base = 'block px-4 py-3 rounded-lg text-sm font-medium transition-colors';
    return this.activeSection === sectionId
      ? `${base} text-indigo-400 bg-indigo-500/10`
      : `${base} text-slate-400 hover:text-indigo-300 hover:bg-white/5`;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
