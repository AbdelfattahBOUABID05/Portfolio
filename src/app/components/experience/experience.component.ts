import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideShieldCheck, LucideNetwork, LucideMonitor } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';

interface ExperienceItem {
  titleKey: string;
  companyKey: string;
  locationKey: string;
  periodKey: string;
  activitiesKey: string;
  icon: Type<any>;
  index: number;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideShieldCheck, LucideNetwork, LucideMonitor, ScrollRevealDirective, TranslatePipe],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  readonly ShieldCheck = LucideShieldCheck;
  readonly Network = LucideNetwork;
  readonly Monitor = LucideMonitor;

  public experiences = signal<ExperienceItem[]>([
    {
      titleKey: 'experienceList.0.title',
      companyKey: 'experienceList.0.company',
      locationKey: 'experienceList.0.location',
      periodKey: 'experienceList.0.period',
      activitiesKey: 'experienceList.0.activities',
      icon: LucideMonitor,
      index: 0
    },
    {
      titleKey: 'experienceList.1.title',
      companyKey: 'experienceList.1.company',
      locationKey: 'experienceList.1.location',
      periodKey: 'experienceList.1.period',
      activitiesKey: 'experienceList.1.activities',
      icon: LucideNetwork,
      index: 1
    },
    {
      titleKey: 'experienceList.2.title',
      companyKey: 'experienceList.2.company',
      locationKey: 'experienceList.2.location',
      periodKey: 'experienceList.2.period',
      activitiesKey: 'experienceList.2.activities',
      icon: LucideMonitor,
      index: 2
    },
    {
      titleKey: 'experienceList.3.title',
      companyKey: 'experienceList.3.company',
      locationKey: 'experienceList.3.location',
      periodKey: 'experienceList.3.period',
      activitiesKey: 'experienceList.3.activities',
      icon: LucideShieldCheck,
      index: 3
    }
  ]);
}
