import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  private reducedMotion = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reducedMotion) {
      this.renderer.addClass(this.el.nativeElement, 'opacity-100');
      return;
    }

    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.renderer.addClass(this.el.nativeElement, 'translate-y-8');

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
            this.renderer.removeClass(this.el.nativeElement, 'translate-y-8');
            this.renderer.addClass(this.el.nativeElement, 'opacity-100');
            this.renderer.addClass(this.el.nativeElement, 'translate-y-0');
            this.renderer.addClass(this.el.nativeElement, 'transition-all');
            this.renderer.addClass(this.el.nativeElement, 'duration-700');
            this.renderer.addClass(this.el.nativeElement, 'ease-out');
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
