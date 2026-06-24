import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translateService = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  private readonly STORAGE_KEY = 'preferredLanguage';
  private readonly SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'];
  private readonly DEFAULT_LANGUAGE = 'en';
  private currentLanguage = this.DEFAULT_LANGUAGE;

  constructor() {}

  init(): void {
    let language = this.getStoredLanguage();
    
    if (!language) {
      language = this.getBrowserLanguage();
    }
    
    this.setLanguage(language);
  }

  setLanguage(lang: string): void {
    const validLang = this.SUPPORTED_LANGUAGES.includes(lang) ? lang : this.DEFAULT_LANGUAGE;
    this.translateService.use(validLang);
    this.currentLanguage = validLang;
    this.storeLanguage(validLang);
    this.updateDirection();
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  switchLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    let newLang: string;
    if (currentLang === 'en') {
      newLang = 'fr';
    } else if (currentLang === 'fr') {
      newLang = 'ar';
    } else {
      newLang = 'en';
    }
    this.setLanguage(newLang);
  }

  private updateDirection(): void {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      html.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }

  private getBrowserLanguage(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return this.DEFAULT_LANGUAGE;
    }
    
    const browserLang = navigator.language.split('-')[0];
    return this.SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : this.DEFAULT_LANGUAGE;
  }

  private getStoredLanguage(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(this.STORAGE_KEY);
  }

  private storeLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }
}
