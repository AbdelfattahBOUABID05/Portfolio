import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { ProjectsComponent } from './projects.component';
import { ProjectFilterService } from '../../services/project-filter.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
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

    const created = TestBed.createComponent(ProjectsComponent);
    fixture = created;
    component = created.componentInstance;
    filter = TestBed.inject(ProjectFilterService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show all projects when no filter is active', () => {
    expect(component.hasActiveFilter()).toBe(false);
    expect(component.filteredProjects().length).toBe(6);
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
    expect(component.filteredProjects().length).toBe(6);
  });

  it('should declare three case studies, Motatawi3 being the only live one', () => {
    const withCaseStudy = component.projects().filter((project) => project.hasCaseStudy);

    expect(withCaseStudy.map((project) => project.slug).sort()).toEqual([
      'cicd-pipeline',
      'logsoc',
      'motatawi3',
    ]);
    expect(withCaseStudy.find((p) => p.slug === 'logsoc')?.caseStudyKey).toBe('caseStudies.logsoc');
    expect(withCaseStudy.find((p) => p.slug === 'cicd-pipeline')?.caseStudyKey).toBe(
      'caseStudies.cicdPipeline',
    );
    expect(withCaseStudy.map((p) => p.liveUrl).filter(Boolean)).toEqual([
      'https://motatawi3-sefrou.vercel.app/',
    ]);
  });

  it('should expose no external link for LogSOC and CI/CD (local only, no public repository)', () => {
    for (const slug of ['logsoc', 'cicd-pipeline']) {
      const project = component.projects().find((p) => p.slug === slug);
      expect(project?.liveUrl).toBeUndefined();
      expect(project?.githubUrl).toBeUndefined();
    }
  });

  it('should render one collapsed case study panel per case study, each wired to its toggle', () => {
    const panels = fixture.nativeElement.querySelectorAll('[id^="case-study-"]') as NodeListOf<HTMLElement>;
    expect(panels.length).toBe(3);

    for (const slug of ['logsoc', 'cicd-pipeline', 'motatawi3']) {
      const toggle = fixture.nativeElement.querySelector(
        `button[aria-controls="case-study-${slug}"]`,
      ) as HTMLButtonElement | null;
      expect(toggle).not.toBeNull();
      expect(toggle?.getAttribute('aria-expanded')).toBe('false');

      const panel = fixture.nativeElement.querySelector(`#case-study-${slug}`) as HTMLElement;
      expect(panel.hidden).toBe(true);
    }
  });

  it('should expand then collapse the case study panel on toggle', () => {
    const toggle = fixture.nativeElement.querySelector(
      'button[aria-controls="case-study-motatawi3"]',
    ) as HTMLButtonElement;
    const panel = fixture.nativeElement.querySelector('#case-study-motatawi3') as HTMLElement;

    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);

    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);
  });
});
