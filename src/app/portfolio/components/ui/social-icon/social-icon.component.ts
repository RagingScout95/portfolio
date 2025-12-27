import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLink } from '../../../models/portfolio.models';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [href]="link.url"
      target="_blank"
      rel="noreferrer"
      [title]="link.name"
      class="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-blue-500 hover:scale-110 transition-all duration-300 text-slate-100 font-semibold"
    >
      <span class="text-sm">{{ link.icon || getInitials(link.name) }}</span>
    </a>
  `,
  styles: []
})
export class SocialIconComponent {
  @Input() link!: SocialLink;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}





