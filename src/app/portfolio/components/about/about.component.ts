import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, Education } from '../../models/portfolio.models';

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
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <ng-container *ngIf="mode !== 'timeline-only'">
        <div class="text-center mb-12">
          <p class="section-label">About</p>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">About Me</h2>
        </div>
        <div class="glass-card max-w-3xl mx-auto p-8 md:p-10" [class.mb-16]="mode === 'full'">
          <p class="text-slate-300 leading-relaxed text-lg">{{ profile.about }}</p>
        </div>
      </ng-container>

      <div *ngIf="(mode === 'timeline-only' || mode === 'full') && timelineItems.length">
        <div class="text-center mb-12">
          <p class="section-label">Journey</p>
          <h2 [class]="mode === 'timeline-only' ? 'text-3xl md:text-4xl font-bold tracking-tight text-slate-100' : 'text-2xl md:text-3xl font-bold text-slate-100'">
            Education & Career
          </h2>
        </div>

        <div class="max-w-2xl mx-auto space-y-6">
          <div
            *ngFor="let item of timelineItems; let i = index"
            class="glass-card p-6 hover:border-indigo-500/30 transition-all duration-300 stagger-item"
            [style.animation-delay.ms]="i * 60"
          >
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                {{ item.type === 'education' ? 'Education' : 'Current Role' }}
              </span>
              <span class="text-slate-600">·</span>
              <span class="text-xs text-slate-500">{{ item.dateLabel }}</span>
            </div>
            <h4 class="text-lg font-semibold text-slate-100 mb-1">{{ item.title }}</h4>
            <p class="text-slate-400 mb-2">{{ item.subtitle }}</p>
            <p class="text-sm text-slate-500 leading-relaxed" *ngIf="item.description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {
  @Input() profile!: Profile;
  @Input() mode: 'full' | 'about-only' | 'timeline-only' = 'full';

  get timelineItems(): TimelineItem[] {
    const items: TimelineItem[] = [];
    if (!this.profile) return items;

    this.profile.education?.forEach((edu: Education) => {
      items.push({
        type: 'education',
        dateLabel: edu.year,
        sortKey: this.parseYear(edu.year),
        title: edu.degree,
        subtitle: edu.institute
      });
    });

    if (this.profile.currentJob?.title) {
      const since = this.profile.currentJob.since?.trim();
      items.push({
        type: 'job',
        dateLabel: since ? 'Since ' + since : 'Current',
        sortKey: 9999,
        title: this.profile.currentJob.title,
        subtitle: this.profile.currentJob.company,
        description: this.profile.currentJob.description || undefined
      });
    }

    return items.sort((a, b) => b.sortKey - a.sortKey);
  }

  private parseYear(s: string): number {
    if (!s) return 0;
    const digits = s.match(/\d{4}/g);
    if (!digits?.length) return 0;
    const nums = digits.map(Number).filter(y => y >= 1900 && y <= 2100);
    return nums.length ? Math.max(...nums) : 0;
  }
}
