import { Injectable, OnDestroy } from '@angular/core';
import { CanvasGameEngine } from './canvas-game-engine';
import { GameMode } from './game-mode.enum';
import { GlobalRocketCursorService } from './global-rocket-cursor.service';

/**
 * Angular service to manage canvas game lifecycle
 * Handles device detection, mode selection, and cleanup
 */
@Injectable({
  providedIn: 'root'
})
export class CanvasGameService implements OnDestroy {
  private engine: CanvasGameEngine | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private canvas: HTMLCanvasElement | null = null;
  
  constructor(private globalRocketCursor: GlobalRocketCursorService) {}
  
  /**
   * Initialize and start the canvas game
   */
  init(canvas: HTMLCanvasElement, container: HTMLElement): void {
    // Cleanup any existing engine
    this.destroy();
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[CanvasGame] Reduced motion preference detected, skipping animation');
      return;
    }
    
    this.canvas = canvas;
    
    // Ensure canvas has dimensions before initializing
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn('[CanvasGame] Canvas has zero dimensions, retrying...', rect);
      // Retry after a short delay
      setTimeout(() => this.init(canvas, container), 200);
      return;
    }
    
    // Detect device type and select mode
    const mode = this.detectGameMode();
    console.log('[CanvasGame] Initializing with mode:', mode, 'Canvas size:', rect.width, 'x', rect.height);
    
    // Initialize engine
    this.engine = new CanvasGameEngine();
    this.engine.init(canvas, mode);
    
    // Setup resize observer
    this.setupResizeObserver(canvas, container);
    
    // Initial resize (ensure canvas internal size matches display size)
    this.engine.resize();
    
    // Verify canvas is properly sized
    const finalRect = canvas.getBoundingClientRect();
    if (canvas.width !== finalRect.width || canvas.height !== finalRect.height) {
      console.warn('[CanvasGame] Canvas size mismatch after resize:', 
        'internal:', canvas.width, 'x', canvas.height, 
        'display:', finalRect.width, 'x', finalRect.height);
    }
    
    // Start the game
    this.engine.start();
    console.log('[CanvasGame] Game started');
    
    // Initialize global rocket cursor (desktop only)
    if (mode === GameMode.DesktopInteractive) {
      this.globalRocketCursor.init();
    }
  }
  
  /**
   * Destroy the current engine instance
   */
  destroy(): void {
    if (this.engine) {
      this.engine.destroy();
      this.engine = null;
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    // Destroy global rocket cursor
    this.globalRocketCursor.destroy();
    
    this.canvas = null;
  }
  
  /**
   * Detect device type and return appropriate game mode
   * Rules:
   * - Desktop: fine pointer + hover + width >= 1024
   * - Otherwise: Mobile/Tablet
   */
  private detectGameMode(): GameMode {
    // Check for fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    
    // Check for hover capability
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    // Check width
    const isWideEnough = window.innerWidth >= 1024;
    
    if (hasFinePointer && hasHover && isWideEnough) {
      return GameMode.DesktopInteractive;
    }
    
    return GameMode.MobileAmbient;
  }
  
  /**
   * Setup resize observer to handle canvas resizing
   */
  private setupResizeObserver(canvas: HTMLCanvasElement, container: HTMLElement): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.engine) {
        this.engine.resize();
      }
    });
    
    this.resizeObserver.observe(container);
  }
  
  /**
   * Cleanup on service destroy (when app is destroyed)
   */
  ngOnDestroy(): void {
    this.destroy();
  }
}

