import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { AppBadgeComponent } from '../../shared/badge/badge.component';
import { EXPERIENCES, ExperienceItem } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, TranslatePipe, AppBadgeComponent],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  public languageService = inject(LanguageService);

  public experiences = signal<ExperienceItem[]>([...EXPERIENCES]);
}
