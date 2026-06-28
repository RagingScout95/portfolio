import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialIconComponent } from '../ui/social-icon/social-icon.component';
import { SocialLink } from '../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SocialIconComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
      <div class="text-center mb-8">
        <p class="hud-title">⟨ Comms Channel ⟩</p>
        <h2 class="hud-heading mt-2">Contact</h2>
      </div>
      <div class="max-w-lg mx-auto">
        <form (ngSubmit)="onSubmit()" class="hud-panel p-6 space-y-4">
          <input type="text" [(ngModel)]="formData.name" name="name" required placeholder="Callsign / Name" class="w-full px-4 py-3 bg-black/30 border border-teal-500/20 text-slate-200 font-mono text-sm focus:border-teal-400 focus:outline-none"/>
          <input type="email" [(ngModel)]="formData.email" name="email" required placeholder="Email frequency" class="w-full px-4 py-3 bg-black/30 border border-teal-500/20 text-slate-200 font-mono text-sm focus:border-teal-400 focus:outline-none"/>
          <textarea [(ngModel)]="formData.message" name="message" required rows="4" placeholder="Transmission..." class="w-full px-4 py-3 bg-black/30 border border-teal-500/20 text-slate-200 font-mono text-sm focus:border-teal-400 focus:outline-none resize-none"></textarea>
          <div *ngIf="showSuccess" class="text-teal-400 text-sm font-mono">TRANSMISSION SENT. STANDING BY.</div>
          <button type="submit" class="hud-btn hud-btn-primary w-full">[ Send Transmission ]</button>
        </form>
        <div class="mt-8 text-center" *ngIf="socialLinks.length">
          <div class="flex gap-2 justify-center flex-wrap">
            <app-social-icon *ngFor="let link of socialLinks" [link]="link"></app-social-icon>
          </div>
        </div>
        <footer class="mt-12 text-center text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          RagingScout97 Systems · {{ year }}
        </footer>
      </div>
    </div>
  `,
})
export class ContactComponent {
  @Input() socialLinks: SocialLink[] = [];
  year = new Date().getFullYear();
  formData = { name: '', email: '', message: '' };
  showSuccess = false;

  onSubmit(): void {
    this.showSuccess = true;
    this.formData = { name: '', email: '', message: '' };
    setTimeout(() => (this.showSuccess = false), 5000);
  }
}
