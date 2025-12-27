import { Component } from '@angular/core';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PortfolioPageComponent],
  template: `
    <app-portfolio-page></app-portfolio-page>
  `,
  styles: []
})
export class AppComponent {
  title = 'portfolio';
}





