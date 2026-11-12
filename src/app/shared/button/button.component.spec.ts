import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [AppButtonComponent],
  template: `
    <app-button href="#projects">Primary<span class="arrow">arrow</span></app-button>
    <app-button>Secondary<span class="arrow">arrow</span></app-button>
  `,
})
class ButtonHostComponent {}

describe('AppButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ButtonHostComponent] }).compileComponents();
  });

  it('should project text and elements into the <a> branch when href is provided', () => {
    const fixture = TestBed.createComponent(ButtonHostComponent);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement | null;
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('#projects');
    expect(anchor?.textContent).toContain('Primary');
    expect(anchor?.querySelector('.arrow')).toBeTruthy();
  });

  it('should project text and elements into the <button> branch when href is absent', () => {
    const fixture = TestBed.createComponent(ButtonHostComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement | null;
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Secondary');
    expect(button?.querySelector('.arrow')).toBeTruthy();
  });
});
