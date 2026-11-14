import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCodeXml, LucideExternalLink } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectFilterService } from '../../services/project-filter.service';
import { AppCardComponent } from '../../shared/card/card.component';
import { AppBadgeComponent } from '../../shared/badge/badge.component';
import { AppButtonComponent } from '../../shared/button/button.component';
import { PROJECTS, Project } from '../../data/portfolio.data';

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

  public projects = signal<Project[]>([...PROJECTS]);

  readonly openCaseStudy = signal<string | null>(null);

  toggleCaseStudy(slug: string): void {
    this.openCaseStudy.update((current) => (current === slug ? null : slug));
  }

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
