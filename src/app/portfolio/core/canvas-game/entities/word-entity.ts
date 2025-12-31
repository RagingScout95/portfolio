import { GAME_CONFIG } from '../game-config';

/**
 * Word entity - falls down the screen
 */
export class WordEntity {
  x: number = 0;
  y: number = 0;
  text: string = '';
  active: boolean = false;
  horizontalDrift: number = 0; // pixels per second
  
  private color: string = GAME_CONFIG.COLOR_WHITE;
  
  /**
   * Initialize a word entity
   */
  init(x: number, y: number, text: string): void {
    this.x = x;
    this.y = y;
    this.text = text;
    this.active = true;
    // Random horizontal drift (-drift to +drift)
    this.horizontalDrift = (Math.random() - 0.5) * 2 * GAME_CONFIG.WORD_HORIZONTAL_DRIFT;
    
    // Assign color based on word type (theme colors)
    this.assignThemeColor(text);
  }
  
  /**
   * Assign theme color based on word type
   */
  private assignThemeColor(text: string): void {
    const lowerText = text.toLowerCase();
    
    // Red color for: Java keywords, languages, frameworks
    if (lowerText.includes('java') || 
        lowerText.includes('react') || 
        lowerText.includes('angular') || 
        lowerText.includes('spring') ||
        lowerText.includes('class') ||
        lowerText.includes('interface') ||
        lowerText.includes('function') ||
        lowerText.includes('method') ||
        lowerText.includes('async') ||
        lowerText.includes('await') ||
        lowerText.includes('promise')) {
      // Randomly choose between red shades
      this.color = Math.random() > 0.5 ? GAME_CONFIG.COLOR_RED : GAME_CONFIG.COLOR_RED_DARK;
    }
    // Gray colors for: terminal commands, tools, databases
    else if (lowerText.includes('docker') ||
             lowerText.includes('kubectl') ||
             lowerText.includes('kubernetes') ||
             lowerText.includes('git') ||
             lowerText.includes('npm') ||
             lowerText.includes('yarn') ||
             lowerText.includes('mysql') ||
             lowerText.includes('postgresql') ||
             lowerText.includes('mongodb') ||
             lowerText.includes('aws') ||
             lowerText.includes('azure') ||
             lowerText.includes('gcp')) {
      // Randomly choose between gray shades
      const grayColors = [GAME_CONFIG.COLOR_GRAY, GAME_CONFIG.COLOR_GRAY_LIGHT];
      this.color = grayColors[Math.floor(Math.random() * grayColors.length)];
    }
    // Default: mix of white and gray
    else {
      const defaultColors = [GAME_CONFIG.COLOR_WHITE, GAME_CONFIG.COLOR_GRAY];
      this.color = defaultColors[Math.floor(Math.random() * defaultColors.length)];
    }
  }
  
  /**
   * Update position based on delta time
   */
  update(deltaTime: number, canvasWidth: number, canvasHeight: number): void {
    if (!this.active) return;
    
    // Fall downward
    this.y += GAME_CONFIG.WORD_FALL_SPEED * deltaTime;
    
    // Horizontal drift
    this.x += this.horizontalDrift * deltaTime;
    
    // Wrap horizontally (optional, or clamp)
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    
    // Deactivate if below viewport (will be respawned)
    if (this.y > canvasHeight + 50) {
      this.active = false;
    }
  }
  
  /**
   * Render the word
   */
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    
    ctx.save();
    ctx.globalAlpha = GAME_CONFIG.WORD_OPACITY;
    ctx.fillStyle = this.color; // Use assigned theme color
    ctx.font = `${GAME_CONFIG.WORD_FONT_SIZE}px ${GAME_CONFIG.FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
  
  /**
   * Get collision circle center and radius
   */
  getCollisionBounds(): { x: number; y: number; radius: number } {
    return {
      x: this.x,
      y: this.y,
      radius: GAME_CONFIG.WORD_COLLISION_RADIUS
    };
  }
  
  /**
   * Reset entity for reuse
   */
  reset(): void {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.text = '';
    this.horizontalDrift = 0;
    this.color = GAME_CONFIG.COLOR_WHITE;
  }
}

