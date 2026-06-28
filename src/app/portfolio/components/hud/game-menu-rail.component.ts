import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { NavSection } from '../navbar/navbar.component';
import { prefersReducedMotion } from '../../core/motion/motion.util';

export interface GameMenuItem extends NavSection {
  index: string;
  subtitle?: string;
}

@Component({
  selector: 'app-game-menu-rail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Desktop: left RPG menu rail -->
    <aside
      class="hidden lg:flex fixed left-0 top-0 bottom-0 z-50 w-[17rem] flex-col game-menu-rail"
      aria-label="Main navigation"
    >
      <div class="game-frame flex-1 flex flex-col m-3 mb-3 mr-0">
        <div class="game-frame-inner flex-1 flex flex-col p-5">
          <div class="mb-8">
            <p class="game-kicker">Portfolio OS</p>
            <h1 class="game-logo">{{ brandText }}</h1>
            <p class="game-version">build 2.0 · online</p>
          </div>

          <nav class="flex-1 space-y-1 relative">
            <div
              class="menu-cursor absolute left-0 right-0 h-[2.75rem] pointer-events-none"
              [style.transform]="'translateY(' + cursorY + 'px)'"
            ></div>
            <button
              *ngFor="let item of menuItems; let i = index"
              type="button"
              class="game-menu-item w-full text-left"
              [class.is-active]="activeSection === item.id"
              (click)="select(item.id)"
              (mouseenter)="hoverIndex = i"
            >
              <span class="game-menu-index">{{ item.index }}</span>
              <span class="game-menu-label">{{ item.label }}</span>
              <span class="game-menu-sub" *ngIf="item.subtitle">{{ item.subtitle }}</span>
            </button>
          </nav>

          <div class="mt-auto pt-6 border-t border-amber-500/15 font-mono text-[10px] text-slate-500 space-y-1">
            <p>SYS <span class="text-emerald-400">OK</span></p>
            <p>LATency <span class="text-amber-400/80">12ms</span></p>
            <p class="text-slate-600">↑↓ navigate · enter select</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile: compact top bar + pause menu overlay -->
    <div class="lg:hidden fixed top-0 inset-x-0 z-50 game-mobile-bar">
      <div class="flex items-center justify-between px-4 h-12">
        <span class="game-logo text-sm">{{ brandText }}</span>
        <button type="button" class="game-pause-btn" (click)="pauseOpen = true">
          <span class="game-pause-icon"></span>
          MENU
        </button>
      </div>
    </div>

    <div
      *ngIf="pauseOpen"
      class="lg:hidden fixed inset-0 z-[60] game-pause-overlay"
      (click)="pauseOpen = false"
    >
      <div class="game-pause-panel" (click)="$event.stopPropagation()">
        <p class="game-kicker text-center mb-2">— PAUSED —</p>
        <h2 class="game-logo text-center text-2xl mb-8">Select Destination</h2>
        <nav class="space-y-2">
          <button
            *ngFor="let item of menuItems"
            type="button"
            class="game-menu-item w-full"
            [class.is-active]="activeSection === item.id"
            (click)="select(item.id); pauseOpen = false"
          >
            <span class="game-menu-index">{{ item.index }}</span>
            <span class="game-menu-label">{{ item.label }}</span>
          </button>
        </nav>
        <button type="button" class="game-pause-resume mt-8 w-full" (click)="pauseOpen = false">
          ▶ Resume
        </button>
      </div>
    </div>

    <!-- Section progress strip (right edge) -->
    <div class="hidden lg:block fixed right-3 top-1/2 -translate-y-1/2 z-40">
      <div class="game-progress-rail">
        <button
          *ngFor="let item of menuItems"
          type="button"
          class="game-progress-dot"
          [class.is-active]="activeSection === item.id"
          [title]="item.label"
          (click)="select(item.id)"
        ></button>
      </div>
    </div>
  `,
})
export class GameMenuRailComponent implements OnChanges {
  @Input() brandText = 'RAGINGSCOUT97';
  @Input() activeSection = 'hero';
  @Input() sections: NavSection[] = [];
  @Output() navigateSection = new EventEmitter<string>();

  pauseOpen = false;
  hoverIndex = 0;
  cursorY = 0;

  menuItems: GameMenuItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sections']) {
      this.menuItems = this.sections.map((s, i) => ({
        ...s,
        index: String(i + 1).padStart(2, '0'),
        subtitle: this.subtitleFor(s.id),
      }));
      this.syncCursor();
    }
    if (changes['activeSection']) {
      this.syncCursor();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (this.pauseOpen) return;
    const idx = this.menuItems.findIndex(m => m.id === this.activeSection);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = this.menuItems[Math.min(idx + 1, this.menuItems.length - 1)];
      if (next) this.select(next.id);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = this.menuItems[Math.max(idx - 1, 0)];
      if (prev) this.select(prev.id);
    }
  }

  select(id: string): void {
    this.navigateSection.emit(id);
    this.syncCursor(true);
  }

  private syncCursor(animate = false): void {
    const idx = this.menuItems.findIndex(m => m.id === this.activeSection);
    const targetY = idx * 44;
    if (animate && !prefersReducedMotion()) {
      gsap.to(this, { cursorY: targetY, duration: 0.35, ease: 'power3.out' });
    } else {
      this.cursorY = targetY;
    }
  }

  private subtitleFor(id: string): string {
    const map: Record<string, string> = {
      hero: 'title',
      about: 'dossier',
      timeline: 'archive',
      experience: 'deployments',
      skills: 'loadout',
      projects: 'missions',
      contact: 'uplink',
    };
    return map[id] ?? '';
  }
}
