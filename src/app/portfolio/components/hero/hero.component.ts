import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { SocialIconComponent } from '../ui/social-icon/social-icon.component';
import { GlitchTextDirective } from '../../directives/glitch-text.directive';
import { SocialLink } from '../../models/portfolio.models';
import { CanvasGameService } from '../../core/canvas-game/canvas-game.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SocialIconComponent, GlitchTextDirective],
  template: `
    <section 
      #heroSection
      class="hero relative overflow-hidden min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-black via-black to-black px-4 md:px-8 pt-20 md:pt-0"
    >
      <!-- Canvas Background Layer -->
      <canvas 
        #heroCanvas
        class="hero-canvas absolute inset-0 z-0 pointer-events-none"
      ></canvas>
      
      <!-- Content Layer -->
      <div class="hero-content relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <!-- Left Content -->
        <div class="flex-1 text-center md:text-left space-y-6">
          <h1 
            appGlitchText
            class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 animate-fade-in"
          >
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
              [alt]="name + ' - ' + role"
              loading="eager"
              fetchpriority="high"
              width="384"
              height="384"
              class="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-red-600 shadow-2xl shadow-red-600/50"
            />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-canvas {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `]
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() name!: string;
  @Input() role!: string;
  @Input() tagline!: string;
  @Input() photoUrl!: string;
  @Input() socialLinks: SocialLink[] = [];
  
  @ViewChild('heroCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection', { static: false }) sectionRef!: ElementRef<HTMLElement>;

  constructor(private canvasGameService: CanvasGameService) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Defer canvas game initialization to improve initial load performance
    // Use requestIdleCallback if available, otherwise use a longer timeout
    if (this.canvasRef?.nativeElement && this.sectionRef?.nativeElement) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          this.initializeCanvasGame();
        }, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          this.initializeCanvasGame();
        }, 500);
      }
    }
  }

  private initializeCanvasGame(): void {
    if (this.canvasRef?.nativeElement && this.sectionRef?.nativeElement) {
      this.canvasGameService.init(
        this.canvasRef.nativeElement,
        this.sectionRef.nativeElement
      );
    }
  }

  ngOnDestroy(): void {
    // Cleanup canvas game when component is destroyed
    this.canvasGameService.destroy();
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}





