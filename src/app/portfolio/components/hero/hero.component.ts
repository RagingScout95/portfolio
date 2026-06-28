import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { SocialIconComponent } from '../ui/social-icon/social-icon.component';
import { SocialLink } from '../../models/portfolio.models';
import { ScrollContainerService } from '../../core/motion/scroll-container.service';
import { prefersReducedMotion } from '../../core/motion/motion.util';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SocialIconComponent],
  template: `
    <section class="relative flex items-center min-h-[calc(100vh-3rem)] lg:min-h-screen px-6 md:px-12 py-16">
      <!-- Decorative wireframe corner -->
      <div class="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-amber-500/20 pointer-events-none hidden md:block"></div>
      <div class="absolute bottom-16 left-8 w-16 h-16 border-b-2 border-l-2 border-teal-500/20 pointer-events-none hidden md:block"></div>

      <div class="w-full max-w-5xl mx-auto">
        <p class="game-kicker mb-4">// new game + continue</p>

        <div class="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div #content class="space-y-5">
            <h1 class="font-[Orbitron] text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase leading-[0.95] tracking-tight text-[#f5f0e8]">
              {{ name }}
            </h1>
            <p class="font-[Share_Tech_Mono] text-amber-400 text-sm md:text-base tracking-widest uppercase">
              &gt; {{ role }}
            </p>
            <p class="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed border-l-2 border-amber-500/30 pl-4">
              {{ tagline }}
            </p>

            <div class="flex flex-wrap gap-3 pt-4">
              <button type="button" class="hud-btn hud-btn-primary" (click)="scrollTo('projects')">
                Start Missions
              </button>
              <button type="button" class="hud-btn" (click)="scrollTo('contact')">
                Open Uplink
              </button>
            </div>

            <div class="flex flex-wrap gap-2 pt-6" *ngIf="socialLinks.length">
              <app-social-icon *ngFor="let link of socialLinks" [link]="link"></app-social-icon>
            </div>
          </div>

          <div #photoWrap class="flex justify-center lg:justify-end">
            <div class="game-content-panel p-2 w-48 sm:w-56 md:w-64">
              <div class="relative overflow-hidden">
                <img
                  [src]="photoUrl"
                  [alt]="name"
                  loading="eager"
                  fetchpriority="high"
                  class="w-full aspect-[3/4] object-cover grayscale-[20%] contrast-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-500/5 pointer-events-none"></div>
              </div>
              <div class="flex justify-between px-2 py-2 font-[Share_Tech_Mono] text-[9px] text-slate-500 uppercase">
                <span>ID verified</span>
                <span class="text-teal-400">online</span>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-16 font-[Share_Tech_Mono] text-[10px] text-slate-600 animate-pulse hidden sm:block">
          Press ↑↓ in menu to navigate · scroll to explore
        </p>
      </div>
    </section>
  `,
})
export class HeroComponent implements AfterViewInit {
  @Input() name!: string;
  @Input() role!: string;
  @Input() tagline!: string;
  @Input() photoUrl!: string;
  @Input() socialLinks: SocialLink[] = [];

  @ViewChild('content') contentRef!: ElementRef<HTMLElement>;
  @ViewChild('photoWrap') photoRef!: ElementRef<HTMLElement>;

  constructor(private scrollContainer: ScrollContainerService) {}

  ngAfterViewInit(): void {
    if (prefersReducedMotion()) return;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(this.contentRef.nativeElement.children, { opacity: 0, x: -24, stagger: 0.07, duration: 0.65 })
      .from(this.photoRef.nativeElement, { opacity: 0, x: 24, duration: 0.6 }, '-=0.35');
  }

  scrollTo(id: string): void {
    this.scrollContainer.scrollToId(id);
  }
}
