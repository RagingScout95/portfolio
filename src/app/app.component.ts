import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';
import { BootLoaderComponent } from './portfolio/core/boot/boot-loader.component';
import { BootService } from './portfolio/core/boot/boot.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PortfolioPageComponent, BootLoaderComponent],
  template: `
    <app-boot-loader *ngIf="showBoot" (bootComplete)="onBootComplete()"></app-boot-loader>
    <app-portfolio-page *ngIf="bootDone"></app-portfolio-page>
  `,
})
export class AppComponent {
  showBoot: boolean;
  bootDone: boolean;

  constructor(private bootService: BootService) {
    this.showBoot = this.bootService.shouldShowBoot();
    this.bootDone = !this.showBoot;
  }

  onBootComplete(): void {
    this.bootService.completeBoot();
    this.showBoot = false;
    this.bootDone = true;
  }
}
