import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollContainerService {
  private el?: HTMLElement;

  register(element: HTMLElement): void {
    this.el = element;
  }

  scrollToId(id: string): void {
    const target = document.getElementById(id);
    if (this.el && target) {
      this.el.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    } else {
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    if (this.el) {
      this.el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get scrollTop(): number {
    return this.el?.scrollTop ?? window.scrollY;
  }
}
