import { ChangeDetectionStrategy, Component, computed, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAward, LucideBriefcase, LucideCpu, LucideFolderKanban, LucideLanguages } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { AppCardComponent } from '../../shared/card/card.component';
import { CERTIFICATIONS, EXPERIENCES, PROJECTS, SUPPORTED_LANGUAGES } from '../../data/portfolio.data';

/** Une métrique d'impact : clé i18n du libellé, valeur dérivée des données, icône. */
interface ImpactStat {
  labelKey: string;
  value: number;
  icon: Type<unknown>;
}

/** Nombre de technologies distinctes utilisées par l'ensemble des projets (union). */
const TECHNOLOGY_COUNT = new Set(PROJECTS.flatMap((project) => project.technologies)).size;

@Component({
  selector: 'app-impact',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, TranslatePipe, AppCardComponent],
  templateUrl: './impact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpactComponent {
  /** Les 5 valeurs sont dérivées de la source unique : aucun chiffre codé en dur. */
  readonly stats = computed<ImpactStat[]>(() => [
    { labelKey: 'impact.projects', value: PROJECTS.length, icon: LucideFolderKanban },
    { labelKey: 'impact.technologies', value: TECHNOLOGY_COUNT, icon: LucideCpu },
    { labelKey: 'impact.certifications', value: CERTIFICATIONS.length, icon: LucideAward },
    { labelKey: 'impact.experiences', value: EXPERIENCES.length, icon: LucideBriefcase },
    { labelKey: 'impact.languages', value: SUPPORTED_LANGUAGES.length, icon: LucideLanguages }
  ]);
}
