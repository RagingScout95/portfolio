import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, Education, CurrentJob, Experience } from '../../models/portfolio.models';

export type TimelineItemType = 'education' | 'job' | 'experience';

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
      <h2 class="text-4xl md:text-5xl font-bold text-gray-100 mb-12 text-center">
        About Me
      </h2>

      <!-- About Text -->
      <div class="mb-16 max-w-3xl mx-auto">
        <p class="text-lg text-gray-300 leading-relaxed text-justify">
          {{ profile.about }}
        </p>
      </div>

      <!-- Unified Timeline: Education + Job (+ Experience) – alternating left/right -->
      <div class="relative" *ngIf="timelineItems.length">
        <h3 class="text-xl font-bold text-gray-100 mb-8 text-center">Education & Career</h3>
        <!-- Central vertical line (centered by transform so it aligns with heading) -->
        <div class="absolute left-1/2 top-0 bottom-0 w-px bg-red-900/50 -translate-x-1/2" aria-hidden="true"></div>
        <div class="space-y-0">
          <div
            *ngFor="let item of timelineItems; let i = index"
            class="relative flex flex-col md:flex-row md:items-start pb-12 last:pb-0"
          >
            <!-- Node dot: absolutely centered on the timeline line -->
            <div
              class="absolute left-1/2 top-0 w-4 h-4 -translate-x-1/2 z-10 md:top-1"
              aria-hidden="true"
            >
              <div
                class="w-4 h-4 rounded-full border-2 border-red-500 bg-black"
                [ngClass]="item.type === 'job' ? 'bg-red-500/20' : 'bg-black'"
              ></div>
            </div>
            <!-- Left slot (even index); hidden on mobile when empty -->
            <div class="flex-1 md:pr-6 flex md:justify-end order-2 md:order-1 pt-6 md:pt-0" [class.hidden]="i % 2 === 1">
              <div
                *ngIf="i % 2 === 0"
                class="w-full max-w-md bg-black border border-red-900/50 rounded-xl p-5 hover:border-red-600/50 transition-all duration-300"
              >
                <p class="text-sm font-semibold text-red-500 uppercase tracking-wide mb-1">{{ item.dateLabel }}</p>
                <p class="text-gray-400 text-xs mb-2">{{ item.type === 'education' ? 'Education' : (item.type === 'job' ? 'Current role' : 'Experience') }}</p>
                <h4 class="text-lg font-semibold text-gray-100 mb-1">{{ item.title }}</h4>
                <p class="text-gray-300 mb-2">{{ item.subtitle }}</p>
                <p class="text-gray-400 text-sm leading-relaxed" *ngIf="item.description">{{ item.description }}</p>
              </div>
            </div>
            <!-- Spacer for center (keeps flex balance; dot is absolute) -->
            <div class="flex-shrink-0 order-1 md:order-2 w-0 md:w-4" aria-hidden="true"></div>
            <!-- Right slot (odd index); hidden on mobile when empty -->
            <div class="flex-1 md:pl-6 flex md:justify-start order-3 pt-6 md:pt-0" [class.hidden]="i % 2 === 0">
              <div
                *ngIf="i % 2 === 1"
                class="w-full max-w-md bg-black border border-red-900/50 rounded-xl p-5 hover:border-red-600/50 transition-all duration-300"
              >
                <p class="text-sm font-semibold text-red-500 uppercase tracking-wide mb-1">{{ item.dateLabel }}</p>
                <p class="text-gray-400 text-xs mb-2">{{ item.type === 'education' ? 'Education' : (item.type === 'job' ? 'Current role' : 'Experience') }}</p>
                <h4 class="text-lg font-semibold text-gray-100 mb-1">{{ item.title }}</h4>
                <p class="text-gray-300 mb-2">{{ item.subtitle }}</p>
                <p class="text-gray-400 text-sm leading-relaxed" *ngIf="item.description">{{ item.description }}</p>
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
  @Input() experiences: Experience[] = [];

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

    (this.experiences || []).forEach((exp: Experience) => {
      items.push({
        type: 'experience',
        dateLabel: exp.from + ' – ' + exp.to,
        sortKey: this.parseYear(exp.to),
        title: exp.role,
        subtitle: exp.company,
        description: exp.description?.join(' ')
      });
    });

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
