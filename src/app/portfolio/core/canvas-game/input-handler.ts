/**
 * Input handler for desktop interactive mode
 * Manages mouse position and click events
 */
export class InputHandler {
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isMouseDown: boolean = false;
  private lastFireTime: number = 0;
  private fireRateLimit: number = 150; // milliseconds
  
  /**
   * Get current mouse position
   */
  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }
  
  /**
   * Check if fire button is pressed (respects fire rate limit)
   */
  canFire(): boolean {
    const now = Date.now();
    if (this.isMouseDown && (now - this.lastFireTime) >= this.fireRateLimit) {
      this.lastFireTime = now;
      return true;
    }
    return false;
  }
  
  /**
   * Handle mouse move
   * Can be called with either MouseEvent or coordinates
   */
  handleMouseMove(event: MouseEvent | { clientX: number; clientY: number }, canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }
  
  /**
   * Handle mouse down
   */
  handleMouseDown(): void {
    this.isMouseDown = true;
  }
  
  /**
   * Handle mouse up
   */
  handleMouseUp(): void {
    this.isMouseDown = false;
  }
  
  /**
   * Set fire rate limit
   */
  setFireRateLimit(ms: number): void {
    this.fireRateLimit = ms;
  }
  
  /**
   * Reset input state
   */
  reset(): void {
    this.isMouseDown = false;
    this.lastFireTime = 0;
  }
}

