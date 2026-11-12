import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'neutral' | 'primary' | 'success';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: '<ng-content />'
})
export class AppBadgeComponent {
  readonly variant = input<BadgeVariant>('neutral');
  /** Classes additionnelles pour les teintes hors neutral/primary/success (ex. indigo, rose). */
  readonly extraClass = input<string>('');

  private static readonly VARIANTS: Record<BadgeVariant, string> = {
    neutral:
      'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300',
    primary: 'bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400',
    success: 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
  };

  protected readonly hostClasses = computed(() =>
    [
      'inline-flex items-center px-3 py-1 text-xs font-black uppercase tracking-widest',
      'rounded-[var(--radius-chip)]',
      AppBadgeComponent.VARIANTS[this.variant()],
      this.extraClass()
    ]
      .filter(Boolean)
      .join(' ')
  );
}
