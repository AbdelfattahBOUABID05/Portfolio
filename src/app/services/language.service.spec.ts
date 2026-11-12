import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateService,
  TranslationObject,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

import { LanguageService } from './language.service';

/**
 * Loader i18n contrôlé par le test : il n'émet que lorsque le test le décide,
 * ce qui permet de vérifier que l'initialiseur n'a PAS encore rendu la main
 * tant que le "JSON" (HTTP en production) n'est pas arrivé.
 */
class ControlledLoader implements TranslateLoader {
  static pending = new Subject<TranslationObject>();

  getTranslation(): Observable<TranslationObject> {
    return ControlledLoader.pending.asObservable();
  }
}

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: TranslateService;

  beforeEach(() => {
    ControlledLoader.pending = new Subject<TranslationObject>();
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService({
          loader: provideTranslateLoader(ControlledLoader),
        }),
      ],
    });

    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
  });

  it('attend le chargement de la langue non-EN avant de rendre la main', async () => {
    localStorage.setItem('preferredLanguage', 'fr');

    let resolved = false;
    const initialization = service.init().then(() => {
      resolved = true;
    });

    // Le "réseau" n'a encore rien renvoyé : l'initialiseur doit rester en attente,
    // et tant qu'il attend, le pipe `| translate` afficherait la CLÉ BRUTE.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(resolved).toBe(false);
    expect(translateService.instant('hero.tagline')).toBe('hero.tagline');

    // Le JSON arrive : l'initialiseur peut se résoudre.
    ControlledLoader.pending.next({
      'hero.tagline': 'EXPERTISE FULL-STACK',
      'seo.title': 'Portfolio — FR',
      'seo.description': 'Description FR',
    });
    ControlledLoader.pending.complete();
    await initialization;

    expect(resolved).toBe(true);
    expect(translateService.instant('hero.tagline')).toBe('EXPERTISE FULL-STACK');
    expect(translateService.getCurrentLang()).toBe('fr');
    expect(service.getCurrentLanguage()).toBe('fr');
    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.dir).toBe('ltr');
    expect(localStorage.getItem('preferredLanguage')).toBe('fr');

    // Titre mis à jour avec la traduction, jamais avec la clé brute.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(TestBed.inject(Title).getTitle()).toBe('Portfolio — FR');
  });

  it('ne dépend pas du JSON pour la langue par défaut (EN)', async () => {
    localStorage.setItem('preferredLanguage', 'en');

    // Doit se résoudre sans qu'aucune traduction n'ait été émise : si EN passait
    // par le loader, ce test dépasserait le délai d'attente de Vitest.
    await service.init();

    expect(service.getCurrentLanguage()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('preferredLanguage')).toBe('en');
  });
});
