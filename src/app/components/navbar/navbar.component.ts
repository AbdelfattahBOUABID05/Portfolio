import { Component, signal, inject, HostListener, afterNextRender } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
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

  constructor() {
    afterNextRender(() => {
      this.checkScroll();
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

  checkScroll(): void {
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

  scrollToSection(sectionId: string): void {
    this.closeMenu();
    this.isLanguageDropdownOpen.set(false);
    const id = sectionId.replace('#', '');
    this.viewportScroller.scrollToAnchor(id);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen.set(!this.isLanguageDropdownOpen());
  }

  selectLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.isLanguageDropdownOpen.set(false);
  }
}
