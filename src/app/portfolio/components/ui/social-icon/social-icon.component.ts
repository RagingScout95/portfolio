import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLink } from '../../../models/portfolio.models';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a [href]="link.url" target="_blank" rel="noreferrer" [title]="link.name"
       class="flex items-center justify-center w-10 h-10 border border-teal-500/25 bg-teal-500/5 text-teal-300/90 hover:border-teal-400 hover:text-teal-200 transition-all duration-300">
      <span class="text-[10px] font-bold font-[Rajdhani] uppercase">{{ shortLabel() }}</span>
    </a>
  `,
})
export class SocialIconComponent {
  @Input() link!: SocialLink;

  shortLabel(): string {
    const n = this.link.name.toLowerCase();
    if (n.includes('github')) return 'GH';
    if (n.includes('linkedin')) return 'IN';
    if (n.includes('youtube')) return 'YT';
    if (n.includes('leetcode')) return 'LC';
    if (n.includes('codechef')) return 'CC';
    if (n.includes('instagram')) return 'IG';
    return (this.link.icon || this.link.name).slice(0, 2).toUpperCase();
  }
}
