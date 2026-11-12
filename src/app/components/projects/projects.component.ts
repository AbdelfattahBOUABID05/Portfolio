import { Component, computed, inject, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCodeXml, LucideExternalLink, LucideZap, LucideCpu, LucideNetwork, LucideServer, LucideSmartphone } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectFilterService } from '../../services/project-filter.service';
import { AppCardComponent } from '../../shared/card/card.component';
import { AppBadgeComponent } from '../../shared/badge/badge.component';
import { AppButtonComponent } from '../../shared/button/button.component';

interface Project {
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  featuresKey: string;
  technologies: string[];
  icon: Type<unknown>;
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideCodeXml, LucideExternalLink, ScrollRevealDirective, TranslatePipe, AppCardComponent, AppBadgeComponent, AppButtonComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  private readonly projectFilter = inject(ProjectFilterService);

  readonly selectedTech = this.projectFilter.selectedTech;

  readonly LucideGithub = LucideCodeXml;
  readonly LucideExternalLink = LucideExternalLink;

  public projects = signal<Project[]>([
    {
      titleKey: 'projectsList.0.title',
      categoryKey: 'projectsList.0.category',
      descriptionKey: 'projectsList.0.description',
      featuresKey: 'projectsList.0.features',
      technologies: ['Angular', 'Flask', 'GitLab CI/CD', 'Docker', 'Nginx', 'LLM'],
      icon: LucideCpu,
      index: 0
    },
    {
      titleKey: 'projectsList.1.title',
      categoryKey: 'projectsList.1.category',
      descriptionKey: 'projectsList.1.description',
      featuresKey: 'projectsList.1.features',
      technologies: ['Jenkins','Docker', 'DevOps', 'CI/CD', 'Automation', 'Git'],
      icon: LucideZap,
      index: 1
    },
    {
      titleKey: 'projectsList.2.title',
      categoryKey: 'projectsList.2.category',
      descriptionKey: 'projectsList.2.description',
      featuresKey: 'projectsList.2.features',
      technologies: ['Flutter', 'Dart', 'Laravel', 'OOP', 'State Management'],
      icon: LucideSmartphone,
      index: 2
    },
    {
      titleKey: 'projectsList.3.title',
      categoryKey: 'projectsList.3.category',
      descriptionKey: 'projectsList.3.description',
      featuresKey: 'projectsList.3.features',
      technologies: ['Cisco IOS', 'Packet Tracer', 'Routing', 'Switching', 'NAT', 'VLANs', 'ACLs'],
      icon: LucideNetwork,
      index: 3
    },
    {
      titleKey: 'projectsList.4.title',
      categoryKey: 'projectsList.4.category',
      descriptionKey: 'projectsList.4.description',
      featuresKey: 'projectsList.4.features',
      technologies: ['VMware ESXi', 'Windows Server', 'Active Directory', 'DNS', 'Datastores'],
      icon: LucideServer,
      index: 4
    }
  ]);

  readonly filteredProjects = computed<Project[]>(() => {
    const tech = this.selectedTech();
    if (!tech) {
      return this.projects();
    }
    const needle = tech.trim().toLowerCase();
    return this.projects().filter((project) =>
      project.technologies.some((item) => item.toLowerCase() === needle)
    );
  });

  readonly hasActiveFilter = computed<boolean>(() => this.selectedTech() !== null);

  clearFilter(): void {
    this.projectFilter.clear();
  }
}
