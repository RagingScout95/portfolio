import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../ui/button/button.component';
import { SocialIconComponent } from '../ui/social-icon/social-icon.component';
import { SocialLink } from '../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, SocialIconComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <div class="text-center mb-12">
        <p class="section-label">Contact</p>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Get In Touch</h2>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto">
          Have a question or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      <div class="max-w-xl mx-auto">
        <form (ngSubmit)="onSubmit()" class="glass-card p-8 space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="formData.name"
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="formData.email"
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              [(ngModel)]="formData.message"
              required
              rows="5"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>

          <div *ngIf="showSuccessMessage" class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
            Thank you! I'll get back to you soon.
          </div>

          <app-button label="Send Message" type="primary"></app-button>
        </form>

        <div class="mt-12 text-center" *ngIf="socialLinks.length">
          <p class="text-slate-500 text-sm mb-4">Or connect with me</p>
          <div class="flex gap-3 justify-center flex-wrap">
            <app-social-icon *ngFor="let link of socialLinks" [link]="link"></app-social-icon>
          </div>
        </div>
      </div>

      <footer class="mt-20 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
        <p>Built with Angular & Tailwind · © {{ year }} ragingscout97</p>
      </footer>
    </div>
  `,
})
export class ContactComponent {
  @Input() socialLinks: SocialLink[] = [];
  year = new Date().getFullYear();

  formData = { name: '', email: '', message: '' };
  showSuccessMessage = false;

  onSubmit(): void {
    this.showSuccessMessage = true;
    this.formData = { name: '', email: '', message: '' };
    setTimeout(() => (this.showSuccessMessage = false), 5000);
  }
}
