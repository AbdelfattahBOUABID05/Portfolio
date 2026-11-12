import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { DefaultLanguageLoader } from './i18n/default-language.loader';
import { LanguageService } from './services/language.service';

export function initializeApp(languageService: LanguageService) {
  return () => {
    // Renvoie une Promise : Angular attend la résolution avant l'hydratation.
    // Pour EN (défaut), elle est déjà résolue (traductions inlinées) ; pour FR/AR
    // elle attend le JSON HTTP afin qu'aucune clé brute ne soit affichée.
    return languageService.init();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: [
        // Configuration du loader HTTP, utilisé pour les langues non par défaut
        // (FR/AR) par `DefaultLanguageLoader`.
        {
          provide: TRANSLATE_HTTP_LOADER_CONFIG,
          useValue: {
            resources: [{ prefix: 'assets/i18n/', suffix: '.json' }]
          }
        },
        provideTranslateLoader(DefaultLanguageLoader)
      ]
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [LanguageService],
      multi: true
    }
  ],
};
