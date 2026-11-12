import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // jsdom n'implémente pas window.matchMedia : stub minimal requis par ThemeService.
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

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the dark mode state', () => {
    const initial = service.isDarkMode();
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(!initial);
  });
});
