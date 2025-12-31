import { GAME_CONFIG } from '../game-config';

/**
 * Fragment entity - created when word is hit
 */
export class FragmentEntity {
  x: number = 0;
  y: number = 0;
  vx: number = 0; // velocity x
  vy: number = 0; // velocity y
  active: boolean = false;
  lifetime: number = 0;
  maxLifetime: number = GAME_CONFIG.FRAGMENT_LIFETIME;
  
  /**
   * Initialize a fragment
   */
  init(x: number, y: number, angle: number, speed: number): void {
    this.x = x;
    this.y = y;
    // Random velocity in direction
    const baseSpeed = speed || GAME_CONFIG.FRAGMENT_SPEED;
    this.vx = Math.cos(angle) * baseSpeed * (0.5 + Math.random() * 0.5);
    this.vy = Math.sin(angle) * baseSpeed * (0.5 + Math.random() * 0.5);
    this.active = true;
    this.lifetime = 0;
  }
  
  /**
   * Update position and lifetime
   */
  update(deltaTime: number, canvasWidth: number, canvasHeight: number): void {
    if (!this.active) return;
    
    // Update position
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    
    // Update lifetime
    this.lifetime += deltaTime * 1000; // convert to ms
    
    // Deactivate if lifetime expired or out of bounds
    if (this.lifetime >= this.maxLifetime || 
        this.x < -50 || this.x > canvasWidth + 50 ||
        this.y < -50 || this.y > canvasHeight + 50) {
      this.active = false;
    }
  }
  
  /**
   * Render the fragment
   */
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    
    // Fade out over lifetime
    const alpha = GAME_CONFIG.FRAGMENT_OPACITY * (1 - this.lifetime / this.maxLifetime);
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = GAME_CONFIG.COLOR_RED; // Theme red
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  /**
   * Reset entity for reuse
   */
  reset(): void {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.lifetime = 0;
  }
}

