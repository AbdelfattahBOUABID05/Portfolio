import { Injectable, signal, Inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDark = signal<boolean>(true);
  public isDarkMode = this.isDark.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Initialisation depuis le stockage ou les préférences
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      
      this.isDark.set(shouldBeDark);

      // 2. Utilisation d'un effet pour appliquer les changements au DOM et au stockage
      effect(() => {
        const dark = this.isDark();
        this.applyTheme(dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      });
    }
  }

  public toggleTheme() {
    this.isDark.update(dark => !dark);
  }

  private applyTheme(dark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
