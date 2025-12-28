import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngIf="isVisible"
      (click)="scrollToTop()"
      class="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-300 text-white text-xl"
      aria-label="Back to top"
    >
      🚀
    </button>
  `,
  styles: []
})
export class BackToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isVisible = window.scrollY > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}





