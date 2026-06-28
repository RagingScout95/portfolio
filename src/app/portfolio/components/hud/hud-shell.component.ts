import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavSection } from '../navbar/navbar.component';

@Component({
  selector: 'app-hud-shell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 inset-x-0 z-50 border-b border-teal-500/20 bg-[#070b12]/90 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <span class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse flex-shrink-0"></span>
          <a
            href="#hero"
            (click)="navigate($event, 'hero')"
            class="font-[Rajdhani] text-sm md:text-base font-bold uppercase tracking-[0.2em] text-teal-400 truncate neon-text"
          >
            ⟨ {{ brandText }} ⟩
          </a>
        </div>

        <nav class="hidden lg:flex items-center gap-1">
          <a
            *ngFor="let s of sections"
            [href]="'#' + s.id"
            (click)="navigate($event, s.id)"
            [class]="linkClass(s.id)"
          >{{ s.label }}</a>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="mapOpen.emit()"
            class="hud-btn text-[10px] md:text-xs hidden sm:inline-flex"
          >
            Tactical Map
          </button>
          <button
            type="button"
            class="lg:hidden hud-btn text-xs px-3"
            (click)="mobileOpen = !mobileOpen"
            aria-label="Toggle menu"
          >Menu</button>
        </div>
      </div>

      <div *ngIf="mobileOpen" class="lg:hidden border-t border-teal-500/20 px-4 py-3 grid grid-cols-2 gap-2">
        <a
          *ngFor="let s of sections"
          [href]="'#' + s.id"
          (click)="navigate($event, s.id); mobileOpen = false"
          class="hud-btn text-center text-xs"
        >{{ s.label }}</a>
        <button type="button" class="hud-btn text-xs col-span-2" (click)="mapOpen.emit(); mobileOpen = false">
          Tactical Map
        </button>
      </div>
    </header>
  `,
})
export class HudShellComponent {
  @Input() sections: NavSection[] = [];
  @Input() brandText = 'RAGINGSCOUT97';
  @Input() activeSection = 'hero';
  @Output() mapOpen = new EventEmitter<void>();
  @Output() navigateSection = new EventEmitter<string>();

  mobileOpen = false;

  navigate(event: Event, id: string): void {
    event.preventDefault();
    this.activeSection = id;
    this.navigateSection.emit(id);
  }

  linkClass(id: string): string {
    const base = 'px-3 py-1.5 text-[11px] font-[Rajdhani] font-bold uppercase tracking-widest transition-all duration-300 rounded';
    return id === this.activeSection
      ? `${base} text-teal-300 bg-teal-500/10 border border-teal-500/30`
      : `${base} text-slate-500 hover:text-teal-400 hover:bg-teal-500/5`;
  }
}
