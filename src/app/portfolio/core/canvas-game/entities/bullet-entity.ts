import { GAME_CONFIG } from '../game-config';

/**
 * Bullet entity - fired from rocket
 */
export class BulletEntity {
  x: number = 0;
  y: number = 0;
  active: boolean = false;
  
  /**
   * Initialize a bullet
   */
  init(startX: number, startY: number): void {
    this.x = startX;
    this.y = startY;
    this.active = true;
  }
  
  /**
   * Update position (moves upward)
   */
  update(deltaTime: number, canvasHeight: number): void {
    if (!this.active) return;
    
    // Move upward
    this.y -= GAME_CONFIG.BULLET_SPEED * deltaTime;
    
    // Deactivate if above viewport
    if (this.y < -10) {
      this.active = false;
    }
  }
  
  /**
   * Render the bullet
   */
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    
    ctx.save();
    ctx.globalAlpha = GAME_CONFIG.BULLET_OPACITY;
    ctx.fillStyle = GAME_CONFIG.COLOR_RED; // Theme red
    ctx.beginPath();
    ctx.arc(this.x, this.y, GAME_CONFIG.BULLET_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  /**
   * Get collision bounds
   */
  getCollisionBounds(): { x: number; y: number; radius: number } {
    return {
      x: this.x,
      y: this.y,
      radius: GAME_CONFIG.BULLET_RADIUS
    };
  }
  
  /**
   * Reset entity for reuse
   */
  reset(): void {
    this.active = false;
    this.x = 0;
    this.y = 0;
  }
}

