import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollContainerService } from '../../core/motion/scroll-container.service';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="isVisible" (click)="scrollToTop()" class="fixed bottom-6 right-6 z-40 hud-btn text-xs" aria-label="Back to top">
      [ TOP ]
    </button>
  `,
})
export class BackToTopComponent implements OnDestroy {
  isVisible = false;
  private intervalId?: ReturnType<typeof setInterval>;

  constructor(private scrollContainer: ScrollContainerService) {
    this.intervalId = setInterval(() => {
      this.isVisible = this.scrollContainer.scrollTop > 400;
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  scrollToTop(): void {
    this.scrollContainer.scrollToTop();
  }
}
