import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowRight, LucideDownload } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideArrowRight, LucideDownload, ScrollRevealDirective, TranslatePipe],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  readonly ArrowRight = LucideArrowRight;
  readonly Download = LucideDownload;
}