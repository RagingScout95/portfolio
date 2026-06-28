import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { SocialIconComponent } from '../ui/social-icon/social-icon.component';
import { SocialLink } from '../../models/portfolio.models';
import { prefersReducedMotion } from '../../core/motion/motion.util';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SocialIconComponent],
  template: `
    <section class="section-snap flex items-center relative pt-14">
      <div class="max-w-7xl mx-auto px-4 md:px-8 w-full py-12 md:py-20">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div #content class="space-y-6 order-2 lg:order-1">
            <p class="hud-title">⟨ Operator Online ⟩</p>
            <h1 class="hud-heading leading-tight">
              <span class="block text-slate-400 text-lg md:text-xl font-normal normal-case tracking-normal mb-2">Callsign</span>
              <span class="neon-text">{{ name }}</span>
            </h1>
            <p class="text-xl md:text-2xl font-[Rajdhani] font-semibold uppercase tracking-wide text-amber-400/90">
              {{ role }}
            </p>
            <p class="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">{{ tagline }}</p>

            <div class="flex flex-wrap gap-3 pt-2">
              <button type="button" class="hud-btn hud-btn-primary" (click)="scrollTo('projects')">
                [ Deploy Projects ]
              </button>
              <button type="button" class="hud-btn" (click)="scrollTo('contact')">
                [ Open Comms ]
              </button>
            </div>

            <div class="flex flex-wrap gap-2 pt-4" *ngIf="socialLinks.length">
              <app-social-icon *ngFor="let link of socialLinks" [link]="link"></app-social-icon>
            </div>
          </div>

          <div #photoWrap class="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div class="hud-panel p-3 max-w-sm w-full">
              <p class="hud-title mb-3 text-center">⟨ Visual ID ⟩</p>
              <img
                [src]="photoUrl"
                [alt]="name"
                loading="eager"
                fetchpriority="high"
                class="w-full aspect-square object-cover rounded border border-teal-500/20"
              />
              <div class="flex justify-between mt-3 text-[10px] font-mono text-slate-600 uppercase">
                <span>Status: Active</span>
                <span class="text-teal-500/80">● Live</span>
              </div>
            </div>
          </div>
        </div>
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

  ngAfterViewInit(): void {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(this.contentRef.nativeElement.children, {
      opacity: 0,
      y: 28,
      stagger: 0.08,
      duration: 0.7,
    }).from(this.photoRef.nativeElement, {
      opacity: 0,
      scale: 0.92,
      duration: 0.65,
    }, '-=0.4');
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
