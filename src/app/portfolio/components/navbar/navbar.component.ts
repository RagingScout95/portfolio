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
    <nav class="fixed top-0 inset-x-0 z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo / Brand -->
          <div class="flex-shrink-0">
            <a
              href="#hero"
              (click)="scrollToSection($event, 'hero')"
              class="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
            >
              Portfolio
            </a>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a
              *ngFor="let section of sections"
              [href]="'#' + section.id"
              (click)="scrollToSection($event, section.id)"
              [class]="getLinkClasses(section.id)"
            >
              {{ section.label }}
            </a>
          </div>
          
          <!-- Mobile Menu Button -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition"
            aria-label="Toggle menu"
          >
            <svg
              *ngIf="!mobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              *ngIf="mobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <!-- Mobile Navigation -->
        <div
          *ngIf="mobileMenuOpen"
          class="md:hidden py-4 space-y-2 border-t border-slate-800"
        >
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
  styles: []
})
export class NavbarComponent {
  @Input() sections: NavSection[] = [];
  
  activeSection = 'hero';
  mobileMenuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Determine active section based on scroll position
    const scrollPosition = window.scrollY + 100;
    
    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
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
    const baseClasses = 'text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium relative pb-1';
    const activeClasses = 'text-blue-400 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500';
    
    return this.activeSection === sectionId
      ? `${baseClasses} ${activeClasses}`
      : baseClasses;
  }

  getMobileLinkClasses(sectionId: string): string {
    const baseClasses = 'block px-4 py-3 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-colors duration-300 font-medium';
    const activeClasses = 'text-blue-400 bg-slate-800';
    
    return this.activeSection === sectionId
      ? `${baseClasses} ${activeClasses}`
      : baseClasses;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}





