import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: '<div appScrollReveal>Contenu</div>',
})
class HostComponent {}

function stubMatchMedia(matches: boolean): void {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

describe('ScrollRevealDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
  });

  it('should create an instance and apply it to the host element', () => {
    stubMatchMedia(false);
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('should reveal immediately when the user prefers reduced motion', () => {
    stubMatchMedia(true);
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.classList.contains('reveal-visible')).toBe(true);
    expect(el.classList.contains('reveal-hidden')).toBe(false);
  });
});
