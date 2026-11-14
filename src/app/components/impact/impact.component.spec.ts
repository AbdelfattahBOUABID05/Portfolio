import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { ImpactComponent } from './impact.component';

describe('ImpactComponent', () => {
  let component: ImpactComponent;
  let fixture: ComponentFixture<ImpactComponent>;

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
      imports: [ImpactComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    const created = TestBed.createComponent(ImpactComponent);
    fixture = created;
    component = created.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should derive the five metrics from the portfolio data (6 / 40 / 8 / 4 / 3)', () => {
    expect(component.stats().map((stat) => stat.value)).toEqual([6, 40, 8, 4, 3]);
  });

  it('should expose one i18n label key per metric, in the expected order', () => {
    expect(component.stats().map((stat) => stat.labelKey)).toEqual([
      'impact.projects',
      'impact.technologies',
      'impact.certifications',
      'impact.experiences',
      'impact.languages',
    ]);
  });
});
