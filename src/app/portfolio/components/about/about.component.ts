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
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
      <ng-container *ngIf="mode !== 'timeline-only'">
        <div class="text-center mb-8">
          <p class="hud-title">⟨ Personnel File ⟩</p>
          <h2 class="hud-heading mt-2">About Me</h2>
        </div>
        <div class="hud-panel p-8 md:p-10 max-w-3xl mx-auto" [class.mb-12]="mode === 'full'">
          <p class="text-slate-300 leading-relaxed text-lg">{{ profile.about }}</p>
        </div>
      </ng-container>

      <div *ngIf="(mode === 'timeline-only' || mode === 'full') && timelineItems.length">
        <div class="text-center mb-8">
          <p class="hud-title">⟨ Mission Log ⟩</p>
          <h2 class="hud-heading mt-2">Education & Career</h2>
        </div>
        <div class="max-w-2xl mx-auto space-y-4">
          <div *ngFor="let item of timelineItems; let i = index" class="hud-panel p-6 stagger-item" [style.animation-delay.ms]="i * 60">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-xs font-[Rajdhani] font-bold uppercase tracking-wider text-teal-400">
                {{ item.type === 'education' ? 'Education' : 'Current Role' }}
              </span>
              <span class="text-slate-600">·</span>
              <span class="text-xs text-slate-500 font-mono">{{ item.dateLabel }}</span>
            </div>
            <h4 class="text-lg font-semibold text-slate-100">{{ item.title }}</h4>
            <p class="text-slate-400">{{ item.subtitle }}</p>
            <p class="text-sm text-slate-500 mt-2" *ngIf="item.description">{{ item.description }}</p>
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
