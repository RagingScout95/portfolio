import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { NavSection } from '../../components/navbar/navbar.component';

interface MapNode {
  section: NavSection;
  x: number;
  y: number;
}

@Component({
  selector: 'app-tactical-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="open"
      class="fixed inset-0 z-[90] bg-[#070b12]/95 backdrop-blur-sm flex flex-col"
      role="dialog"
      aria-label="Tactical map navigation"
    >
      <div class="flex items-center justify-between px-4 h-14 border-b border-teal-500/20">
        <span class="hud-title">⟨ Tactical Map ⟩</span>
        <button type="button" class="hud-btn text-xs" (click)="close()">Close [ESC]</button>
      </div>

      <div
        #viewport
        class="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing touch-none"
        (wheel)="onWheel($event)"
        (mousedown)="onPanStart($event)"
        (mousemove)="onPanMove($event)"
        (mouseup)="onPanEnd()"
        (mouseleave)="onPanEnd()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onPanEnd()"
      >
        <div #world class="absolute origin-top-left will-change-transform" [style.transform]="transform">
          <svg [attr.width]="worldW" [attr.height]="worldH" class="block">
            <defs>
              <radialGradient id="nodeGlow">
                <stop offset="0%" stop-color="#5eead4" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#5eead4" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <line
              *ngFor="let link of links"
              [attr.x1]="link.x1" [attr.y1]="link.y1"
              [attr.x2]="link.x2" [attr.y2]="link.y2"
              stroke="rgba(94,234,212,0.15)" stroke-width="1"
            />
            <g *ngFor="let node of nodes" (click)="selectNode(node, $event)" class="cursor-pointer">
              <circle [attr.cx]="node.x" [attr.cy]="node.y" r="28" fill="url(#nodeGlow)" opacity="0.5"/>
              <circle [attr.cx]="node.x" [attr.cy]="node.y" r="8" fill="#070b12" stroke="#5eead4" stroke-width="2"/>
              <text
                [attr.x]="node.x" [attr.y]="node.y + 24"
                text-anchor="middle"
                fill="#94a3b8"
                font-size="11"
                font-family="Rajdhani, sans-serif"
                font-weight="700"
              >{{ node.section.label }}</text>
            </g>
          </svg>
        </div>
      </div>
      <p class="text-center text-[10px] text-slate-600 py-3 uppercase tracking-widest">
        Scroll to zoom · Drag to pan · Tap node to jump
      </p>
    </div>
  `,
})
export class TacticalMapComponent implements OnInit {
  @Input() open = false;
  @Input() sections: NavSection[] = [];
  @Output() closed = new EventEmitter<void>();
  @Output() sectionSelected = new EventEmitter<string>();

  @ViewChild('viewport') viewportRef!: ElementRef<HTMLElement>;

  worldW = 1400;
  worldH = 900;
  nodes: MapNode[] = [];
  links: { x1: number; y1: number; x2: number; y2: number }[] = [];

  scale = 1;
  panX = 0;
  panY = 0;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  get transform(): string {
    return `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
  }

  ngOnInit(): void {
    this.layoutNodes();
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.open) this.close();
  }

  close(): void {
    this.closed.emit();
  }

  selectNode(node: MapNode, event: Event): void {
    event.stopPropagation();
    const target = {
      scale: this.scale,
      panX: this.panX,
      panY: this.panY,
    };
    gsap.to(target, {
      scale: 1.8,
      panX: -node.x * 1.8 + window.innerWidth / 2 - 50,
      panY: -node.y * 1.8 + window.innerHeight / 2 - 80,
      duration: 0.6,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.scale = target.scale;
        this.panX = target.panX;
        this.panY = target.panY;
      },
      onComplete: () => {
        this.sectionSelected.emit(node.section.id);
        this.close();
      },
    });
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.08 : 0.08;
    this.scale = Math.min(2.5, Math.max(0.4, this.scale + delta));
  }

  onPanStart(event: MouseEvent): void {
    this.dragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onPanMove(event: MouseEvent): void {
    if (!this.dragging) return;
    this.panX += event.clientX - this.lastX;
    this.panY += event.clientY - this.lastY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onPanEnd(): void {
    this.dragging = false;
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.dragging = true;
      this.lastX = event.touches[0].clientX;
      this.lastY = event.touches[0].clientY;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.dragging || event.touches.length !== 1) return;
    event.preventDefault();
    this.panX += event.touches[0].clientX - this.lastX;
    this.panY += event.touches[0].clientY - this.lastY;
    this.lastX = event.touches[0].clientX;
    this.lastY = event.touches[0].clientY;
  }

  private layoutNodes(): void {
    const cx = this.worldW / 2;
    const cy = this.worldH / 2;
    const radius = 280;
    this.nodes = this.sections.map((section, i) => {
      const angle = (i / this.sections.length) * Math.PI * 2 - Math.PI / 2;
      return {
        section,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    });
    const home = this.nodes[0];
    this.links = this.nodes.slice(1).map(n => ({
      x1: home.x, y1: home.y, x2: n.x, y2: n.y,
    }));
    this.centerView();
  }

  private centerView(): void {
    this.panX = (window.innerWidth - this.worldW) / 2;
    this.panY = (window.innerHeight - this.worldH) / 2 - 40;
    this.scale = Math.min(1, window.innerWidth / this.worldW * 0.95);
  }
}
