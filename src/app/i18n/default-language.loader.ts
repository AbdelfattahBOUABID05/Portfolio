import { Injectable } from '@angular/core';
import { TranslationObject } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';
import defaultTranslations from '../../../public/assets/i18n/en.json';

/** Langue par défaut, embarquée dans le bundle (voir `LanguageService`). */
const DEFAULT_LANGUAGE = 'en';

/**
 * Loader i18n : la langue par défaut (EN) est inlinée dans le bundle et servie
 * de façon synchrone — aucune requête HTTP, aucune entrée dans le TransferState.
 * Les autres langues (FR/AR) restent chargées à la demande via le loader HTTP.
 */
@Injectable()
export class DefaultLanguageLoader extends TranslateHttpLoader {
  override getTranslation(lang: string): Observable<TranslationObject> {
    if (lang === DEFAULT_LANGUAGE) {
      return of(defaultTranslations);
    }
    return super.getTranslation(lang);
  }
}
