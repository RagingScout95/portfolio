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
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-100 mb-6 text-center">
        Contact Me
      </h2>
      
      <p class="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Feel free to reach out! Whether you have a question, want to collaborate, or just want to say hello, I'd love to hear from you.
      </p>
      
      <div class="max-w-2xl mx-auto">
        <!-- Contact Form -->
        <form
          (ngSubmit)="onSubmit()"
          class="bg-black border border-red-900/50 rounded-xl shadow-lg p-8 space-y-6"
        >
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-gray-300 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="formData.name"
              required
              class="w-full px-4 py-3 bg-black border border-red-900/50 rounded-lg text-gray-100 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
              placeholder="Your name"
            />
          </div>
          
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-gray-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="formData.email"
              required
              class="w-full px-4 py-3 bg-black border border-red-900/50 rounded-lg text-gray-100 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
              placeholder="your.email@example.com"
            />
          </div>
          
          <!-- Message Textarea -->
          <div>
            <label for="message" class="block text-gray-300 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              [(ngModel)]="formData.message"
              required
              rows="6"
              class="w-full px-4 py-3 bg-black border border-red-900/50 rounded-lg text-gray-100 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>
          
          <!-- Success Message -->
          <div
            *ngIf="showSuccessMessage"
            class="p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-400"
          >
            Thank you for your message! I'll get back to you soon.
          </div>
          
          <!-- Submit Button -->
          <div class="flex justify-center">
            <app-button
              label="Send Message"
              type="primary"
            ></app-button>
          </div>
        </form>
        
        <!-- Social Links -->
        <div class="mt-12">
          <p class="text-gray-400 text-center mb-6">
            Or connect with me on:
          </p>
          <div class="flex gap-4 justify-center">
            <app-social-icon
              *ngFor="let link of socialLinks"
              [link]="link"
            ></app-social-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent {
  @Input() socialLinks: SocialLink[] = [];
  
  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  showSuccessMessage = false;

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    
    // Show success message
    this.showSuccessMessage = true;
    
    // Reset form
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }
}





