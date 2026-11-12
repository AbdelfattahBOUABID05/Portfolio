import {
  Component,
  signal,
  inject,
  effect,
  viewChild,
  ElementRef,
  PLATFORM_ID,
  HostListener,
  afterNextRender
} from '@angular/core';
import { CommonModule, ViewportScroller, isPlatformBrowser } from '@angular/common';
import { LucideMenu, LucideX, LucideDownload, LucideSun, LucideMoon, LucideGlobe, LucideChevronDown } from '@lucide/angular';
import { ThemeService } from '../../services/theme';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideMenu, LucideX, LucideDownload, LucideSun, LucideMoon, LucideGlobe, LucideChevronDown, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly Menu = LucideMenu;
  readonly X = LucideX;
  readonly Download = LucideDownload;
  readonly Sun = LucideSun;
  readonly Moon = LucideMoon;
  readonly Globe = LucideGlobe;
  readonly ChevronDown = LucideChevronDown;

  public themeService = inject(ThemeService);
  public languageService = inject(LanguageService);
  private viewportScroller = inject(ViewportScroller);
  private platformId = inject(PLATFORM_ID);

  readonly burgerButton = viewChild<ElementRef<HTMLButtonElement>>('burgerButton');
  readonly mobileMenu = viewChild<ElementRef<HTMLElement>>('mobileMenu');

  public isMenuOpen = signal(false);
  public isLanguageDropdownOpen = signal(false);
  public activeSection = signal('hero');

  public languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' }
  ];

  public navLinks = [
    { labelKey: 'navbar.home', href: '#hero' },
    { labelKey: 'navbar.about', href: '#about' },
    { labelKey: 'navbar.services', href: '#services' },
    { labelKey: 'navbar.skills', href: '#skills' },
    { labelKey: 'navbar.experience', href: '#experience' },
    { labelKey: 'navbar.projects', href: '#projects' },
    { labelKey: 'navbar.contact', href: '#contact' }
  ];

  private sectionIds = ['hero', 'about', 'services', 'skills', 'experience', 'projects', 'contact'];
  private ticking = false;
  private wasMenuOpen = false;

  constructor() {
    afterNextRender(() => {
      this.checkScroll();
    });

    // Gère le verrouillage du scroll et le retour du focus à l'ouverture/fermeture du menu.
    effect(() => {
      const open = this.isMenuOpen();
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        queueMicrotask(() => this.focusFirstInMenu());
      } else if (this.wasMenuOpen) {
        this.burgerButton()?.nativeElement.focus();
      }

      this.wasMenuOpen = open;
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.checkScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (event.key === 'Escape') {
      if (this.isMenuOpen()) {
        this.closeMenu();
        return;
      }
      if (this.isLanguageDropdownOpen()) {
        this.closeLanguageDropdown();
        return;
      }
    }

    if (event.key === 'Tab' && this.isMenuOpen()) {
      this.trapFocus(event);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.isLanguageDropdownOpen()) {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('[data-lang-dropdown]')) {
      this.closeLanguageDropdown();
    }
  }

  checkScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const navbarHeight = 80;
    let currentSection = 'hero';

    for (const id of this.sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top - navbarHeight <= 150) {
          currentSection = id;
        }
      }
    }

    this.activeSection.set(currentSection);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
    this.closeLanguageDropdown();
    const id = sectionId.replace('#', '');
    this.viewportScroller.scrollToAnchor(id);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen.update((open) => !open);
  }

  closeLanguageDropdown(): void {
    this.isLanguageDropdownOpen.set(false);
  }

  selectLanguage(lang: string, event?: Event): void {
    this.languageService.setLanguage(lang);
    this.closeLanguageDropdown();

    if (event && isPlatformBrowser(this.platformId)) {
      const trigger = (event.currentTarget as HTMLElement | null)
        ?.closest('[data-lang-dropdown]')
        ?.querySelector<HTMLElement>('[data-lang-trigger]');
      trigger?.focus();
    }
  }

  onLangTriggerKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }
    event.preventDefault();

    const key = event.key;
    const trigger = event.currentTarget as HTMLElement;
    const container = trigger.closest('[data-lang-dropdown]');
    this.isLanguageDropdownOpen.set(true);

    setTimeout(() => {
      const options = this.getLangOptions(container);
      const target = key === 'ArrowUp' ? options[options.length - 1] : options[0];
      target?.focus();
    }, 0);
  }

  onLangOptionKeydown(event: KeyboardEvent): void {
    const option = event.currentTarget as HTMLElement;
    const container = option.closest('[data-lang-dropdown]');

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        event.stopPropagation();
        const options = this.getLangOptions(container);
        const current = options.indexOf(option);
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        options[(current + delta + options.length) % options.length]?.focus();
        break;
      }
      case 'Home':
      case 'End': {
        event.preventDefault();
        event.stopPropagation();
        const options = this.getLangOptions(container);
        const target = event.key === 'Home' ? options[0] : options[options.length - 1];
        target?.focus();
        break;
      }
      case 'Escape': {
        event.preventDefault();
        event.stopPropagation();
        this.closeLanguageDropdown();
        container?.querySelector<HTMLElement>('[data-lang-trigger]')?.focus();
        break;
      }
    }
  }

  private getLangOptions(container: Element | null): HTMLElement[] {
    if (!container) {
      return [];
    }
    return Array.from(container.querySelectorAll<HTMLElement>('[data-lang-panel] button'));
  }

  private trapFocus(event: KeyboardEvent): void {
    const menu = this.mobileMenu()?.nativeElement;
    if (!menu) {
      return;
    }

    const focusable = this.getFocusable(menu);
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusFirstInMenu(): void {
    const menu = this.mobileMenu()?.nativeElement;
    if (!menu) {
      return;
    }
    this.getFocusable(menu)[0]?.focus();
  }

  private getFocusable(root: HTMLElement): HTMLElement[] {
    return Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }
}
