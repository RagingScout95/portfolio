import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { prefersReducedMotion, isMobileViewport } from '../motion/motion.util';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

@Component({
  selector: 'app-ambient-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #canvas class="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true"></canvas>
  `,
})
export class AmbientBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx?: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private rafId = 0;
  private running = true;

  ngOnInit(): void {
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    if (!prefersReducedMotion()) {
      this.animate();
    } else {
      this.drawStatic();
    }
  }

  ngOnDestroy(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  private onVisibility = (): void => {
    this.running = document.visibilityState === 'visible';
    if (this.running && !prefersReducedMotion()) {
      cancelAnimationFrame(this.rafId);
      this.animate();
    }
  };

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d') ?? undefined;
    this.resize();
    window.addEventListener('resize', this.resize);
    this.spawnParticles();
  }

  private resize = (): void => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  private spawnParticles(): void {
    const count = isMobileViewport() ? 28 : 70;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));
  }

  private drawStatic(): void {
    const ctx = this.ctx;
    const canvas = this.canvasRef?.nativeElement;
    if (!ctx || !canvas) return;
    const g = ctx.createRadialGradient(
      canvas.width * 0.5, canvas.height * 0.4, 0,
      canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6
    );
    g.addColorStop(0, 'rgba(94, 234, 212, 0.08)');
    g.addColorStop(1, 'rgba(7, 11, 18, 0)');
    ctx.fillStyle = '#070b12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private animate = (): void => {
    if (!this.running) return;
    const ctx = this.ctx;
    const canvas = this.canvasRef?.nativeElement;
    if (!ctx || !canvas) return;

    ctx.fillStyle = 'rgba(7, 11, 18, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(94, 234, 212, ${p.alpha})`;
      ctx.fill();
    }

    this.rafId = requestAnimationFrame(this.animate);
  };
}
