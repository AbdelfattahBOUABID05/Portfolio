import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { AboutComponent } from './about.component';
import { CERTIFICATIONS } from '../../data/portfolio.data';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    // jsdom n'implémente pas window.matchMedia (utilisé par ThemeService et ScrollRevealDirective).
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
      imports: [AboutComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    const created = TestBed.createComponent(AboutComponent);
    fixture = created;
    component = created.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the 8 certifications directly, without any interaction', () => {
    const names = Array.from(fixture.nativeElement.querySelectorAll('app-card p')).map(
      (el) => (el as HTMLElement).textContent?.trim(),
    );

    expect(names).toEqual(CERTIFICATIONS.map((cert) => cert.name));
  });

  it('should no longer expose any dropdown toggle (no aria-expanded in the DOM)', () => {
    expect(fixture.nativeElement.querySelectorAll('[aria-expanded]').length).toBe(0);
  });

  it('should link to every existing badge/certificate PDF, opened safely in a new tab', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('a[href^="assets/certificat/"]'),
    ) as HTMLAnchorElement[];

    // Deux liens par certification, sauf « Ethical Hacker » (badge === pdf).
    const expected = CERTIFICATIONS.reduce((total, cert) => total + (cert.pdf === cert.badge ? 1 : 2), 0);
    expect(links.length).toBe(expected);

    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.getAttribute('aria-label')).toBeTruthy();
    }
  });
});
