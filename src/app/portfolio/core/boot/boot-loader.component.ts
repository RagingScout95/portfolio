import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { prefersReducedMotion } from '../motion/motion.util';

@Component({
  selector: 'app-boot-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #overlay
      class="fixed inset-0 z-[100] flex items-center justify-center cockpit-bg cursor-pointer"
      (click)="skip()"
      (keydown)="onKey($event)"
      tabindex="0"
      role="dialog"
      aria-label="System boot sequence. Press any key or click to skip."
    >
      <div class="absolute inset-0 crt-scanlines opacity-40"></div>
      <div class="relative w-full max-w-lg px-6 font-mono">
        <p class="text-[10px] uppercase tracking-[0.4em] text-teal-500/60 mb-6">RagingScout97 Systems</p>
        <div class="space-y-1 text-sm text-teal-300/90 mb-8 min-h-[120px]">
          <p *ngFor="let line of visibleLines" class="leading-relaxed">{{ line }}</p>
        </div>
        <div class="hud-panel p-4">
          <div class="flex justify-between text-[10px] uppercase tracking-widest text-slate-500 mb-2">
            <span>Boot sequence</span>
            <span>{{ progress }}%</span>
          </div>
          <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-teal-600 to-cyan-400 transition-all duration-150" [style.width.%]="progress"></div>
          </div>
        </div>
        <p class="text-center text-[10px] text-slate-600 mt-6 uppercase tracking-widest animate-pulse">
          Click or press any key to skip
        </p>
      </div>
    </div>
  `,
})
export class BootLoaderComponent implements OnInit, OnDestroy {
  @Output() bootComplete = new EventEmitter<void>();
  @ViewChild('overlay') overlayRef!: ElementRef<HTMLElement>;

  private readonly lines = [
    '> RAGINGSCOUT97 // SYSTEM ONLINE',
    '> Initializing cockpit interface...',
    '> Syncing portfolio modules...',
    '> Loading personnel data...',
    '> STATUS: READY',
  ];

  visibleLines: string[] = [];
  progress = 0;
  private timeline?: gsap.core.Timeline;
  private done = false;

  ngOnInit(): void {
    if (prefersReducedMotion()) {
      this.finish();
      return;
    }
    this.runBoot();
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
  }

  onKey(event: KeyboardEvent): void {
    event.preventDefault();
    this.skip();
  }

  skip(): void {
    if (!this.done) this.finish();
  }

  private runBoot(): void {
    const progress = { value: 0 };
    this.timeline = gsap.timeline({
      onComplete: () => this.finish(),
    });

    this.lines.forEach((line, i) => {
      this.timeline!.call(() => {
        this.visibleLines = [...this.visibleLines, line];
      }, [], i * 0.22);
    });

    this.timeline.to(progress, {
      value: 100,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate: () => {
        this.progress = Math.round(progress.value);
      },
    }, 0);
  }

  private finish(): void {
    if (this.done) return;
    this.done = true;
    this.timeline?.kill();
    this.progress = 100;
    this.visibleLines = [...this.lines];

    const el = this.overlayRef?.nativeElement;
    if (!el || prefersReducedMotion()) {
      this.bootComplete.emit();
      return;
    }

    gsap.to(el, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => this.bootComplete.emit(),
    });
  }
}
