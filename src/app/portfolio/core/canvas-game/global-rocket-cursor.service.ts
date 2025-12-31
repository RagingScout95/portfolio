import { Injectable, OnDestroy } from '@angular/core';

/**
 * Service to manage global rocket cursor overlay
 * Creates a canvas overlay that covers the entire viewport
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalRocketCursorService implements OnDestroy {
  private overlayCanvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private isActive: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private rocketSize: number = 16;
  private animationFrameId: number | null = null;
  
  /**
   * Initialize global rocket cursor
   */
  init(): void {
    if (this.isActive) return;
    
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    // Check if desktop mode
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const isWideEnough = window.innerWidth >= 1024;
    
    if (!hasFinePointer || !hasHover || !isWideEnough) {
      return; // Mobile/tablet - no global cursor
    }
    
    // Create overlay canvas
    this.createOverlayCanvas();
    
    // Hide native cursor
    document.body.style.cursor = 'none';
    
    // Setup mouse tracking
    this.setupMouseTracking();
    
    // Start render loop
    this.isActive = true;
    this.render();
  }
  
  /**
   * Create overlay canvas that covers entire viewport
   */
  private createOverlayCanvas(): void {
    this.overlayCanvas = document.createElement('canvas');
    this.overlayCanvas.id = 'global-rocket-cursor';
    this.overlayCanvas.style.position = 'fixed';
    this.overlayCanvas.style.top = '0';
    this.overlayCanvas.style.left = '0';
    this.overlayCanvas.style.width = '100%';
    this.overlayCanvas.style.height = '100%';
    this.overlayCanvas.style.pointerEvents = 'none';
    this.overlayCanvas.style.zIndex = '9999';
    this.overlayCanvas.style.display = 'block';
    
    document.body.appendChild(this.overlayCanvas);
    
    // Set canvas size
    this.resize();
    
    // Get context
    this.ctx = this.overlayCanvas.getContext('2d', { alpha: true });
    
    // Handle resize
    window.addEventListener('resize', () => this.resize());
  }
  
  /**
   * Resize canvas to match viewport
   */
  private resize(): void {
    if (!this.overlayCanvas) return;
    
    this.overlayCanvas.width = window.innerWidth;
    this.overlayCanvas.height = window.innerHeight;
  }
  
  /**
   * Setup mouse tracking
   */
  private setupMouseTracking(): void {
    const handleMouseMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Store for cleanup
    (this.overlayCanvas as any)._mouseMoveHandler = handleMouseMove;
  }
  
  /**
   * Render loop
   */
  private render(): void {
    if (!this.isActive || !this.ctx || !this.overlayCanvas) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
    
    // Draw rocket (theme red)
    this.ctx.save();
    this.ctx.globalAlpha = 0.50;
    this.ctx.fillStyle = '#ef4444'; // red-500 (theme color)
    
    // Simple triangle rocket pointing up
    this.ctx.beginPath();
    this.ctx.moveTo(this.mouseX, this.mouseY - this.rocketSize);
    this.ctx.lineTo(this.mouseX - this.rocketSize / 2, this.mouseY);
    this.ctx.lineTo(this.mouseX + this.rocketSize / 2, this.mouseY);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.restore();
    
    // Continue loop
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }
  
  /**
   * Cleanup
   */
  ngOnDestroy(): void {
    this.destroy();
  }
  
  /**
   * Destroy overlay
   */
  destroy(): void {
    this.isActive = false;
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // Remove event listeners
    if (this.overlayCanvas) {
      const canvas = this.overlayCanvas as any;
      if (canvas._mouseMoveHandler) {
        window.removeEventListener('mousemove', canvas._mouseMoveHandler);
      }
    }
    
    // Remove canvas
    if (this.overlayCanvas && this.overlayCanvas.parentNode) {
      this.overlayCanvas.parentNode.removeChild(this.overlayCanvas);
    }
    
    // Restore cursor
    document.body.style.cursor = '';
    
    this.overlayCanvas = null;
    this.ctx = null;
  }
}

