import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Set initial hidden state
    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.renderer.addClass(this.el.nativeElement, 'translate-y-6');

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is in view - reveal it
            this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
            this.renderer.removeClass(this.el.nativeElement, 'translate-y-6');
            this.renderer.addClass(this.el.nativeElement, 'opacity-100');
            this.renderer.addClass(this.el.nativeElement, 'translate-y-0');
            this.renderer.addClass(this.el.nativeElement, 'transition');
            this.renderer.addClass(this.el.nativeElement, 'duration-700');
            this.renderer.addClass(this.el.nativeElement, 'ease-out');
            
            // Optionally unobserve after revealing (one-time animation)
            this.observer.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Start observing
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}





