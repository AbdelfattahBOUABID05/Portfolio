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

  it('should declare a case study only on the Motatawi3 project', () => {
    const withCaseStudy = component.projects().filter((project) => project.hasCaseStudy);

    expect(withCaseStudy.length).toBe(1);
    expect(withCaseStudy[0].slug).toBe('motatawi3');
    expect(withCaseStudy[0].caseStudyKey).toBe('caseStudies.motatawi3');
    expect(withCaseStudy[0].liveUrl).toBe('https://motatawi3-sefrou.vercel.app/');
  });

  it('should render a single collapsed case study panel wired to its toggle button', () => {
    const panels = fixture.nativeElement.querySelectorAll('[id^="case-study-"]') as NodeListOf<HTMLElement>;
    expect(panels.length).toBe(1);

    const toggle = fixture.nativeElement.querySelector(
      'button[aria-controls="case-study-motatawi3"]',
    ) as HTMLButtonElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(panels[0].hidden).toBe(true);
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
