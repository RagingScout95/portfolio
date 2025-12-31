import { GameMode } from './game-mode.enum';
import { GAME_CONFIG, PROGRAMMING_TOKENS } from './game-config';
import { WordEntity } from './entities/word-entity';
import { BulletEntity } from './entities/bullet-entity';
import { FragmentEntity } from './entities/fragment-entity';
import { InputHandler } from './input-handler';

/**
 * High-performance canvas game engine
 * Pure TypeScript, framework-agnostic
 * Single requestAnimationFrame loop
 */
export class CanvasGameEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private mode: GameMode = GameMode.MobileAmbient;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  
  // Entities (object pools)
  private words: WordEntity[] = [];
  private bullets: BulletEntity[] = [];
  private fragments: FragmentEntity[] = [];
  
  // Input (desktop only)
  private inputHandler: InputHandler | null = null;
  
  // Rocket state (desktop only)
  private rocketX: number = 0;
  private rocketY: number = 0;
  private globalMouseX: number = 0; // Global mouse position
  private globalMouseY: number = 0;
  private rocketSize: number = 16; // Increased from 8 for better visibility
  private isMouseOverCanvas: boolean = false;
  
  // Spawn timing
  private lastWordSpawn: number = 0;
  
  // Visibility state
  private isVisible: boolean = true;
  
  /**
   * Initialize the engine with canvas and mode
   */
  init(canvas: HTMLCanvasElement, mode: GameMode): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.mode = mode;
    
    if (!this.ctx) {
      console.error('Failed to get 2d context');
      return;
    }
    
    // Initialize object pools
    this.initializePools();
    
    // Initialize input handler for desktop mode
    if (mode === GameMode.DesktopInteractive) {
      this.inputHandler = new InputHandler();
      this.inputHandler.setFireRateLimit(GAME_CONFIG.FIRE_RATE_LIMIT);
      this.setupInputListeners();
    }
    
    // Set initial rocket position (center bottom)
    // Note: canvas.width/height might be 0 here, will be set in resize()
    this.rocketX = Math.max(canvas.width, 400) / 2;
    this.rocketY = Math.max(canvas.height, 600) - 40;
    
    // Spawn initial words immediately (after first resize)
    this.lastWordSpawn = Date.now() - GAME_CONFIG.WORD_SPAWN_INTERVAL - 100; // Will trigger immediate spawn
    
    // Handle visibility changes
    this.setupVisibilityListener();
    
    // Test render to verify canvas context works
    if (this.ctx && canvas.width > 0 && canvas.height > 0) {
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, 10, 10);
      console.log('[CanvasGameEngine] Test render completed, canvas context is working');
    }
  }
  
  /**
   * Initialize object pools
   */
  private initializePools(): void {
    const maxWords = this.mode === GameMode.DesktopInteractive 
      ? GAME_CONFIG.MAX_WORDS_DESKTOP 
      : GAME_CONFIG.MAX_WORDS_MOBILE;
    
    // Initialize word pool
    this.words = [];
    for (let i = 0; i < maxWords; i++) {
      this.words.push(new WordEntity());
    }
    
    // Initialize bullet pool (desktop only)
    if (this.mode === GameMode.DesktopInteractive) {
      this.bullets = [];
      for (let i = 0; i < GAME_CONFIG.MAX_BULLETS; i++) {
        this.bullets.push(new BulletEntity());
      }
      
      // Initialize fragment pool
      this.fragments = [];
      for (let i = 0; i < GAME_CONFIG.MAX_FRAGMENTS; i++) {
        this.fragments.push(new FragmentEntity());
      }
    }
  }
  
  /**
   * Setup input event listeners (desktop only)
   * Uses window-level events so canvas can have pointer-events: none
   * and not block content clicks
   */
  private setupInputListeners(): void {
    if (!this.canvas || !this.inputHandler) return;
    
    // Use window events to track mouse even when over content
    const handleMouseMove = (e: MouseEvent) => {
      if (!this.canvas) return;
      
      // Store global mouse position for rocket cursor everywhere
      this.globalMouseX = e.clientX;
      this.globalMouseY = e.clientY;
      
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is over canvas area
      this.isMouseOverCanvas = (
        x >= 0 && x <= rect.width &&
        y >= 0 && y <= rect.height
      );
      
      if (this.isMouseOverCanvas) {
        this.inputHandler!.handleMouseMove(e, this.canvas);
        // Update rocket position relative to canvas
        this.rocketX = x;
        this.rocketY = y;
      } else {
        // Mouse outside canvas - still track position for global cursor
        // Project mouse position onto canvas bounds for rocket display
        this.rocketX = Math.max(0, Math.min(rect.width, x));
        this.rocketY = Math.max(0, Math.min(rect.height, y));
      }
    };
    
    const handleMouseDown = () => {
      if (this.isMouseOverCanvas) {
        this.inputHandler!.handleMouseDown();
      }
    };
    
    const handleMouseUp = () => {
      this.inputHandler!.handleMouseUp();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
      // Cursor is hidden by global rocket cursor service
    
    // Store handlers for cleanup
    (this.canvas as any)._mouseMoveHandler = handleMouseMove;
    (this.canvas as any)._mouseDownHandler = handleMouseDown;
    (this.canvas as any)._mouseUpHandler = handleMouseUp;
  }
  
  /**
   * Setup visibility change listener
   */
  private setupVisibilityListener(): void {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (!this.isVisible) {
        this.pause();
      } else if (this.canvas) {
        this.start();
      }
    });
  }
  
  /**
   * Start the game loop
   */
  start(): void {
    if (this.isRunning || !this.canvas || !this.ctx) {
      console.warn('[CanvasGameEngine] Cannot start:', {
        isRunning: this.isRunning,
        hasCanvas: !!this.canvas,
        hasCtx: !!this.ctx,
        canvasSize: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : 'N/A'
      });
      return;
    }
    
    // Ensure canvas is properly sized before starting
    this.resize();
    
    if (this.canvas.width === 0 || this.canvas.height === 0) {
      console.warn('[CanvasGameEngine] Canvas has zero size, cannot start');
      return;
    }
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
    console.log('[CanvasGameEngine] Game loop started');
  }
  
  /**
   * Pause the game loop
   */
  pause(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  /**
   * Main game loop (single RAF loop)
   */
  private gameLoop(currentTime: number): void {
    if (!this.isRunning || !this.canvas || !this.ctx || !this.isVisible) {
      return;
    }
    
    // Calculate delta time (in seconds)
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.033); // Cap at ~30fps minimum
    this.lastTime = currentTime;
    
    // Update
    this.update(deltaTime);
    
    // Render
    this.render();
    
    // Continue loop
    this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  /**
   * Update game state
   */
  private update(deltaTime: number): void {
    if (!this.canvas) return;
    
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Update rocket position (desktop only)
    // Rocket position is updated in mouse move handler, but we handle shooting here
    if (this.mode === GameMode.DesktopInteractive && this.inputHandler && this.isMouseOverCanvas) {
      // Handle shooting
      if (this.inputHandler.canFire()) {
        this.fireBullet();
      }
    }
    
    // Update words
    this.words.forEach(word => {
      if (word.active) {
        word.update(deltaTime, width, height);
      }
    });
    
    // Spawn new words
    this.spawnWords();
    
    // Update bullets (desktop only)
    if (this.mode === GameMode.DesktopInteractive) {
      this.bullets.forEach(bullet => {
        if (bullet.active) {
          bullet.update(deltaTime, height);
        }
      });
      
      // Check collisions
      this.checkCollisions();
      
      // Update fragments
      this.fragments.forEach(fragment => {
        if (fragment.active) {
          fragment.update(deltaTime, width, height);
        }
      });
    }
  }
  
  /**
   * Spawn words at intervals
   */
  private spawnWords(): void {
    if (!this.canvas) return;
    
    const now = Date.now();
    if (now - this.lastWordSpawn < GAME_CONFIG.WORD_SPAWN_INTERVAL) {
      return;
    }
    
    // Find inactive word
    const inactiveWord = this.words.find(w => !w.active);
    if (inactiveWord) {
      const token = PROGRAMMING_TOKENS[Math.floor(Math.random() * PROGRAMMING_TOKENS.length)];
      const x = Math.random() * this.canvas.width;
      inactiveWord.init(x, GAME_CONFIG.WORD_SPAWN_Y_OFFSET, token);
      this.lastWordSpawn = now;
    }
    
    // Spawn multiple words initially to make effect more visible
    // Check if this is the first spawn after initialization
    const timeSinceLastSpawn = now - this.lastWordSpawn;
    if (timeSinceLastSpawn >= GAME_CONFIG.WORD_SPAWN_INTERVAL && timeSinceLastSpawn < GAME_CONFIG.WORD_SPAWN_INTERVAL + 100) {
      // First spawn - spawn a few words at once
      const initialSpawnCount = this.mode === GameMode.DesktopInteractive ? 8 : 5;
      for (let i = 0; i < initialSpawnCount; i++) {
        const word = this.words.find(w => !w.active);
        if (word) {
          const token = PROGRAMMING_TOKENS[Math.floor(Math.random() * PROGRAMMING_TOKENS.length)];
          const x = Math.random() * this.canvas.width;
          const y = GAME_CONFIG.WORD_SPAWN_Y_OFFSET - (i * 80); // Stagger them vertically
          word.init(x, y, token);
        }
      }
    }
  }
  
  /**
   * Fire a bullet from rocket (desktop only)
   */
  private fireBullet(): void {
    if (!this.canvas) return;
    
    // Find inactive bullet
    const inactiveBullet = this.bullets.find(b => !b.active);
    if (inactiveBullet) {
      inactiveBullet.init(this.rocketX, this.rocketY);
    }
  }
  
  /**
   * Check bullet-word collisions (desktop only)
   */
  private checkCollisions(): void {
    this.bullets.forEach(bullet => {
      if (!bullet.active) return;
      
      const bulletBounds = bullet.getCollisionBounds();
      
      this.words.forEach(word => {
        if (!word.active) return;
        
        const wordBounds = word.getCollisionBounds();
        
        // Circle collision check
        const dx = bulletBounds.x - wordBounds.x;
        const dy = bulletBounds.y - wordBounds.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < bulletBounds.radius + wordBounds.radius) {
          // Collision! Deactivate bullet and word
          bullet.reset();
          this.createFragments(wordBounds.x, wordBounds.y);
          word.reset();
        }
      });
    });
  }
  
  /**
   * Create fragments when word is hit
   */
  private createFragments(x: number, y: number): void {
    const fragmentCount = 3 + Math.floor(Math.random() * 4); // 3-6 fragments
    
    for (let i = 0; i < fragmentCount; i++) {
      const inactiveFragment = this.fragments.find(f => !f.active);
      if (inactiveFragment) {
        const angle = (Math.PI * 2 * i) / fragmentCount + Math.random() * 0.5;
        inactiveFragment.init(x, y, angle, GAME_CONFIG.FRAGMENT_SPEED);
      }
    }
  }
  
  /**
   * Render everything
   */
  private render(): void {
    if (!this.ctx || !this.canvas) return;
    
    // Skip render if canvas has no size
    if (this.canvas.width === 0 || this.canvas.height === 0) return;
    
    // Clear canvas (transparent background - will show through to page background)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Debug: Count active words
    const activeWordCount = this.words.filter(w => w.active).length;
    if (activeWordCount > 0 && Math.random() < 0.01) { // Log occasionally
      console.log('[CanvasGameEngine] Rendering', activeWordCount, 'active words');
    }
    
    // Render words
    this.words.forEach(word => word.render(this.ctx!));
    
      // Render bullets (desktop only)
      if (this.mode === GameMode.DesktopInteractive) {
        this.bullets.forEach(bullet => bullet.render(this.ctx!));
        
        // Render fragments
        this.fragments.forEach(fragment => fragment.render(this.ctx!));
        
        // Rocket is rendered by global rocket cursor service, not here
      }
  }
  
  /**
   * Render rocket (desktop only)
   * Rocket is now rendered by global rocket cursor service, not here
   * This method kept for compatibility but not used
   */
  private renderRocket(): void {
    // Rocket is rendered by GlobalRocketCursorService
  }
  
  /**
   * Handle canvas resize
   */
  resize(): void {
    if (!this.canvas) return;
    
    // Canvas should be sized by CSS, just sync internal size
    const rect = this.canvas.getBoundingClientRect();
    const newWidth = Math.max(rect.width, 1);
    const newHeight = Math.max(rect.height, 1);
    
    if (this.canvas.width !== newWidth || this.canvas.height !== newHeight) {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      
      // Update rocket position if canvas was resized
      if (this.mode === GameMode.DesktopInteractive) {
        this.rocketX = newWidth / 2;
        this.rocketY = newHeight - 40;
      }
    }
  }
  
  /**
   * Cleanup and destroy
   */
  destroy(): void {
    this.pause();
    
    // Remove event listeners (desktop mode)
    if (this.canvas && this.mode === GameMode.DesktopInteractive) {
      // Remove window-level event listeners
      const canvas = this.canvas as any;
      if (canvas._mouseMoveHandler) {
        window.removeEventListener('mousemove', canvas._mouseMoveHandler);
      }
      if (canvas._mouseDownHandler) {
        window.removeEventListener('mousedown', canvas._mouseDownHandler);
      }
      if (canvas._mouseUpHandler) {
        window.removeEventListener('mouseup', canvas._mouseUpHandler);
      }
      
      // Cursor is restored by global rocket cursor service
    }
    
    // Clear references
    this.canvas = null;
    this.ctx = null;
    this.inputHandler = null;
    this.words = [];
    this.bullets = [];
    this.fragments = [];
  }
}

