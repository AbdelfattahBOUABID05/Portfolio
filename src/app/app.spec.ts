import { TestBed } from '@angular/core/testing';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslateService(), provideClientHydration(withIncrementalHydration())],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Abdelfattah BOUABID');
  });
});
