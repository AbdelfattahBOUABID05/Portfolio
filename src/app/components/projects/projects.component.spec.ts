import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { ProjectsComponent } from './projects.component';
import { ProjectFilterService } from '../../services/project-filter.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let filter: ProjectFilterService;

  beforeEach(async () => {
    // jsdom n'implémente pas window.matchMedia (utilisé par ScrollRevealDirective).
    window.matchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    filter = TestBed.inject(ProjectFilterService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show all projects when no filter is active', () => {
    expect(component.hasActiveFilter()).toBe(false);
    expect(component.filteredProjects().length).toBe(5);
  });

  it('should filter projects by the selected technology', () => {
    filter.select('Docker');

    expect(component.hasActiveFilter()).toBe(true);
    const filtered = component.filteredProjects();
    expect(filtered.length).toBe(2);
    expect(filtered.every((project) => project.technologies.includes('Docker'))).toBe(true);
  });

  it('should match the technology regardless of case', () => {
    filter.select('docker');
    expect(component.filteredProjects().length).toBe(2);
  });

  it('should return an empty list for an unknown technology', () => {
    filter.select('COBOL');
    expect(component.filteredProjects().length).toBe(0);
  });

  it('should restore all projects after clearing the filter', () => {
    filter.select('Docker');
    component.clearFilter();

    expect(component.hasActiveFilter()).toBe(false);
    expect(component.filteredProjects().length).toBe(5);
  });
});
