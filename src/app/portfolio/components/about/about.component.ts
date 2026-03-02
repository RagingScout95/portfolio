import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, Education, CurrentJob } from '../../models/portfolio.models';

export type TimelineItemType = 'education' | 'job';

export interface TimelineItem {
  type: TimelineItemType;
  dateLabel: string;
  sortKey: number;
  title: string;
  subtitle: string;
  description?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <!-- About Me (when not timeline-only) -->
      <ng-container *ngIf="mode !== 'timeline-only'">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-100 mb-12 text-center">
          About Me
        </h2>
        <div class="max-w-3xl mx-auto" [class.mb-16]="mode === 'full'">
          <p class="text-lg text-gray-300 leading-relaxed text-justify">
            {{ profile.about }}
          </p>
        </div>
      </ng-container>

      <!-- Timeline: Education & Career -->
      <div class="relative" *ngIf="(mode === 'timeline-only' || mode === 'full') && timelineItems.length">
        <h2 [class]="mode === 'timeline-only' ? 'text-4xl md:text-5xl font-bold text-gray-100 mb-12 text-center' : 'text-2xl md:text-3xl font-bold text-gray-100 mb-10 md:mb-12 text-center'">Education & Career</h2>

        <!-- Mobile: left-aligned timeline -->
        <div class="md:hidden relative pl-1">
          <div class="absolute left-2 top-14 bottom-0 w-px bg-red-900/50" aria-hidden="true"></div>
          <div
            *ngFor="let item of timelineItems; let i = index"
            class="relative flex gap-3 pl-8 pb-10 last:pb-0"
          >
            <div class="absolute left-2 top-0.5 z-10 -translate-x-1/2" aria-hidden="true">
              <div
                class="w-3 h-3 rounded-full border-2 border-red-500 flex-shrink-0"
                [ngClass]="item.type === 'job' ? 'bg-red-500/30 ring-4 ring-red-900/30' : 'bg-black'"
              ></div>
            </div>
            <div
              class="flex-1 min-w-0 bg-gray-900/50 border border-red-900/40 rounded-lg p-4 hover:border-red-600/50 transition-all duration-300"
            >
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-xs font-semibold text-red-500 uppercase tracking-wider">{{ item.type === 'education' ? 'Education' : 'Current role' }}</span>
                <span class="text-gray-500">·</span>
                <span class="text-xs text-gray-400">{{ item.dateLabel }}</span>
              </div>
              <h4 class="text-base font-semibold text-gray-100 mb-1">{{ item.title }}</h4>
              <p class="text-sm text-gray-400 mb-2">{{ item.subtitle }}</p>
              <p class="text-sm text-gray-500 leading-relaxed" *ngIf="item.description">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Desktop: center timeline with alternating left/right cards -->
        <div class="hidden md:block relative">
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-red-900/50 -translate-x-1/2" aria-hidden="true"></div>
          <div class="space-y-0">
            <div
              *ngFor="let item of timelineItems; let i = index"
              class="relative flex flex-row items-stretch pb-14 last:pb-0"
            >
              <div class="flex-1 flex justify-end pr-6 min-w-0" [class.invisible]="i % 2 === 1">
                <div
                  *ngIf="i % 2 === 0"
                  class="w-full max-w-[420px] bg-gray-900/50 border border-red-900/40 rounded-xl p-6 hover:border-red-600/50 hover:bg-gray-900/70 transition-all duration-300"
                >
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="text-xs font-semibold text-red-500 uppercase tracking-wider">{{ item.type === 'education' ? 'Education' : 'Current role' }}</span>
                    <span class="text-gray-600">·</span>
                    <span class="text-xs text-gray-500">{{ item.dateLabel }}</span>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-100 mb-1">{{ item.title }}</h4>
                  <p class="text-gray-400 mb-2">{{ item.subtitle }}</p>
                  <p class="text-sm text-gray-500 leading-relaxed" *ngIf="item.description">{{ item.description }}</p>
                </div>
              </div>
              <div class="flex-shrink-0 w-4 flex justify-center relative z-10" aria-hidden="true">
                <div
                  class="w-4 h-4 rounded-full border-2 border-red-500 mt-1"
                  [ngClass]="item.type === 'job' ? 'bg-red-500/30 ring-4 ring-red-900/30' : 'bg-black'"
                ></div>
              </div>
              <div class="flex-1 flex justify-start pl-6 min-w-0" [class.invisible]="i % 2 === 0">
                <div
                  *ngIf="i % 2 === 1"
                  class="w-full max-w-[420px] bg-gray-900/50 border border-red-900/40 rounded-xl p-6 hover:border-red-600/50 hover:bg-gray-900/70 transition-all duration-300"
                >
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="text-xs font-semibold text-red-500 uppercase tracking-wider">{{ item.type === 'education' ? 'Education' : 'Current role' }}</span>
                    <span class="text-gray-600">·</span>
                    <span class="text-xs text-gray-500">{{ item.dateLabel }}</span>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-100 mb-1">{{ item.title }}</h4>
                  <p class="text-gray-400 mb-2">{{ item.subtitle }}</p>
                  <p class="text-sm text-gray-500 leading-relaxed" *ngIf="item.description">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {
  @Input() profile!: Profile;
  @Input() mode: 'full' | 'about-only' | 'timeline-only' = 'full';

  get timelineItems(): TimelineItem[] {
    const items: TimelineItem[] = [];
    const profile = this.profile;
    if (!profile) return [];

    profile.education?.forEach((edu: Education) => {
      items.push({
        type: 'education',
        dateLabel: edu.year,
        sortKey: this.parseYear(edu.year),
        title: edu.degree,
        subtitle: edu.institute
      });
    });

    if (profile.currentJob) {
      const since = profile.currentJob.since.trim();
      items.push({
        type: 'job',
        dateLabel: since ? 'Since ' + since : 'Current',
        sortKey: 9999,
        title: profile.currentJob.title,
        subtitle: profile.currentJob.company,
        description: profile.currentJob.description || undefined
      });
    }

    return items.sort((a, b) => b.sortKey - a.sortKey);
  }

  private parseYear(s: string): number {
    if (!s || typeof s !== 'string') return 0;
    const digits = s.match(/\d{4}/g);
    if (!digits?.length) return 0;
    const nums = digits.map(Number).filter(y => y >= 1900 && y <= 2100);
    return nums.length ? Math.max(...nums) : 0;
  }
}
