import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  Input,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type GlitchIntensity = 'hero' | 'subtle';

@Directive({
  selector: '[appGlitchText]',
  standalone: true
})
export class GlitchTextDirective implements AfterViewInit, OnDestroy {
  @Input() appGlitchTextIntensity: GlitchIntensity = 'hero';
  @Input() appGlitchTextDisabled: boolean = false;

  private originalText: string = '';
  private currentText: string = '';
  private typingIndex: number = 0;
  private isTyping: boolean = false;
  private isSettling: boolean = false;
  private isIdle: boolean = false;
  private timers: number[] = [];
  private prefersReducedMotion: boolean = false;

  // Glitch character pool (terminal-style ASCII)
  private readonly glitchChars = ['█', '▓', '▒', '░', '#', '@', '%', '$', '&', '*', '+', '=', '?', '~', '|', '/', '\\'];

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit(): void {
    // Only run in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.prefersReducedMotion = true;
    }

    // Skip if disabled
    if (this.appGlitchTextDisabled) {
      return;
    }

    // Skip if reduced motion is preferred
    if (this.prefersReducedMotion) {
      return;
    }

    // Use setTimeout to ensure we run after Angular's initial render cycle
    // This ensures we capture the interpolated text before clearing it
    setTimeout(() => {
      // Store original text from the element and trim whitespace
      this.originalText = (this.el.nativeElement.textContent || '').trim();
      
      if (this.originalText === '') {
        return;
      }

      // Remove all child nodes (including Angular's text binding nodes)
      // This prevents Angular from re-rendering the interpolation
      while (this.el.nativeElement.firstChild) {
        this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.firstChild);
      }

      // Explicitly set textContent to empty string to ensure clean state
      this.renderer.setProperty(this.el.nativeElement, 'textContent', '');

      // Set data attribute for CSS pseudo-elements
      this.renderer.setAttribute(this.el.nativeElement, 'data-text', this.originalText);

      // Start the animation sequence (textContent will be set by the typing animation)
      this.startTypingAnimation();
    }, 0);
  }

  ngOnDestroy(): void {
    // Clean up all timers
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
    this.isIdle = false;
    this.isTyping = false;
  }

  private startTypingAnimation(): void {
    this.isTyping = true;
    this.typingIndex = 0;
    this.currentText = '';
    
    const totalDuration = this.appGlitchTextIntensity === 'hero' 
      ? 1200 + Math.random() * 400  // 1200-1600ms for hero
      : 800 + Math.random() * 200;   // 800-1000ms for subtle

    const totalChars = this.originalText.length;
    const baseDelay = totalDuration / totalChars;
    
    // Type each character sequentially
    const typeCharacter = (index: number) => {
      if (index >= totalChars || !this.isTyping) {
        // Typing complete
        this.isTyping = false;
        // Ensure final text is set correctly
        this.renderer.setProperty(this.el.nativeElement, 'textContent', this.originalText);
        this.renderer.setAttribute(this.el.nativeElement, 'data-text', this.originalText);
        this.startSettlingPhase();
        return;
      }

      // Occasionally inject a glitch character (10-15% chance)
      const shouldGlitch = Math.random() < (this.appGlitchTextIntensity === 'hero' ? 0.15 : 0.10);
      
      if (shouldGlitch && index < totalChars - 1) {
        // Show glitch character briefly
        const glitchChar = this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
        const displayText = this.currentText + glitchChar;
        this.renderer.setProperty(this.el.nativeElement, 'textContent', displayText);
        // Update data-text to match current display (for CSS ::before/::after)
        this.renderer.setAttribute(this.el.nativeElement, 'data-text', displayText);

        // Remove glitch and show correct character after short delay (30-60ms)
        const glitchDuration = 30 + Math.random() * 30;
        const glitchTimer = window.setTimeout(() => {
          this.currentText += this.originalText[index];
          this.renderer.setProperty(this.el.nativeElement, 'textContent', this.currentText);
          this.renderer.setAttribute(this.el.nativeElement, 'data-text', this.currentText);
          this.typingIndex = index + 1;
          
          // Continue to next character
          const nextTimer = window.setTimeout(() => {
            typeCharacter(index + 1);
          }, baseDelay);
          this.timers.push(nextTimer);
        }, glitchDuration);

        this.timers.push(glitchTimer);
      } else {
        // Normal typing
        this.currentText += this.originalText[index];
        this.renderer.setProperty(this.el.nativeElement, 'textContent', this.currentText);
        this.renderer.setAttribute(this.el.nativeElement, 'data-text', this.currentText);
        this.typingIndex = index + 1;
        
        // Schedule next character
        const nextTimer = window.setTimeout(() => {
          typeCharacter(index + 1);
        }, baseDelay);
        this.timers.push(nextTimer);
      }
    };

    // Start typing the first character
    const firstTimer = window.setTimeout(() => {
      typeCharacter(0);
    }, baseDelay);
    this.timers.push(firstTimer);
  }

  private startSettlingPhase(): void {
    this.isSettling = true;
    
    // After typing completes, trigger multiple strong glitches with random timing
    // This creates a more visible RGB split glitch effect (like CodePen example)
    const numGlitches = 4 + Math.floor(Math.random() * 3); // 4-6 glitches
    
    let currentDelay = 0;
    for (let i = 0; i < numGlitches; i++) {
      const delay = currentDelay;
      const duration = 80 + Math.random() * 40; // 80-120ms per glitch
      const isLast = i === numGlitches - 1;
      
      const glitchTimer = window.setTimeout(() => {
        // Use stronger glitch effect
        this.triggerStrongGlitch(duration, isLast);
      }, delay);
      
      this.timers.push(glitchTimer);
      
      // Random delay between glitches (100-250ms) - more frequent
      currentDelay += 100 + Math.random() * 150;
    }

    // Transition to idle mode after glitch sequence
    const totalDelay = currentDelay + 150;
    const idleTimer = window.setTimeout(() => {
      this.isSettling = false;
      this.isIdle = true;
      this.scheduleNextIdleGlitch();
    }, totalDelay);

    this.timers.push(idleTimer);
  }

  private triggerGlitch(duration: number): void {
    // Activate glitch visual via class
    this.renderer.addClass(this.el.nativeElement, 'glitch-active');
    
    // Optional flicker effect (subtle)
    if (Math.random() < 0.5) {
      this.renderer.addClass(this.el.nativeElement, 'glitch-flicker');
    }

    // Deactivate after duration
    const deactivateTimer = window.setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'glitch-active');
      this.renderer.removeClass(this.el.nativeElement, 'glitch-flicker');
    }, duration);

    this.timers.push(deactivateTimer);
  }

  private triggerStrongGlitch(duration: number, isLast: boolean = false): void {
    // Add strong glitch class for RGB split effect (CSS handles the animation)
    this.renderer.addClass(this.el.nativeElement, 'glitch-strong');
    
    // Optional flicker
    if (Math.random() < 0.7) {
      this.renderer.addClass(this.el.nativeElement, 'glitch-flicker');
    }

    // Add letter glitch - randomly replace 1-3 characters with glitch chars
    const corruptedText = this.corruptLetters(this.originalText);
    if (corruptedText !== this.originalText) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', corruptedText);
      this.renderer.setAttribute(this.el.nativeElement, 'data-text', corruptedText);
    }

    // Deactivate after duration - restore original text
    const deactivateTimer = window.setTimeout(() => {
      // Restore original text
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.originalText);
      this.renderer.setAttribute(this.el.nativeElement, 'data-text', this.originalText);
      
      this.renderer.removeClass(this.el.nativeElement, 'glitch-strong');
      this.renderer.removeClass(this.el.nativeElement, 'glitch-flicker');
    }, duration);

    this.timers.push(deactivateTimer);
  }

  private corruptLetters(text: string): string {
    // Randomly replace 1-3 characters with glitch characters
    const numCorruptions = 1 + Math.floor(Math.random() * 3); // 1-3 letters
    const textArray = text.split('');
    const corruptIndices = new Set<number>();
    
    // Get random indices to corrupt (avoid spaces at start/end)
    while (corruptIndices.size < numCorruptions && corruptIndices.size < textArray.length) {
      const index = Math.floor(Math.random() * textArray.length);
      // Don't corrupt spaces
      if (textArray[index] !== ' ') {
        corruptIndices.add(index);
      }
    }
    
    // Replace selected characters with glitch chars
    const corrupted = [...textArray];
    corruptIndices.forEach(index => {
      corrupted[index] = this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
    });
    
    return corrupted.join('');
  }

  private scheduleNextIdleGlitch(): void {
    if (!this.isIdle) {
      return;
    }

    // More frequent random interval: 2-5 seconds (instead of 4-8)
    const nextGlitchDelay = 2000 + Math.random() * 3000;
    
    const idleTimer = window.setTimeout(() => {
      if (this.isIdle) {
        // Use stronger glitch even in idle mode (but less frequent)
        this.triggerStrongGlitch(60 + Math.random() * 40, false);
        
        // Schedule the next one
        this.scheduleNextIdleGlitch();
      }
    }, nextGlitchDelay);

    this.timers.push(idleTimer);
  }
}

