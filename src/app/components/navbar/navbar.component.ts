import { Component, signal, inject, HostListener, afterNextRender } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { LucideMenu, LucideX, LucideDownload, LucideSun, LucideMoon } from '@lucide/angular';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideMenu, LucideX, LucideDownload, LucideSun, LucideMoon],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly Menu = LucideMenu;
  readonly X = LucideX;
  readonly Download = LucideDownload;
  readonly Sun = LucideSun;
  readonly Moon = LucideMoon;

  public themeService = inject(ThemeService);
  private viewportScroller = inject(ViewportScroller);
  
  public isMenuOpen = signal(false);
  public activeSection = signal('hero');

  public navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' }
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
    const id = sectionId.replace('#', '');
    this.viewportScroller.scrollToAnchor(id);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
