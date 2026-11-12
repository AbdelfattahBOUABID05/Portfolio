import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type CardVariant = 'default' | 'interactive';
export type CardRadius = 'card' | 'chip' | 'button';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: '<ng-content />'
})
export class AppCardComponent {
  readonly variant = input<CardVariant>('default');
  readonly radius = input<CardRadius>('card');
  readonly padding = input<CardPadding>('none');

  private static readonly RADIUS: Record<CardRadius, string> = {
    card: 'rounded-[var(--radius-card)]',
    chip: 'rounded-[var(--radius-chip)]',
    button: 'rounded-[var(--radius-button)]'
  };

  private static readonly PADDING: Record<CardPadding, string> = {
    none: '',
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
    xl: 'p-12'
  };

  protected readonly hostClasses = computed(() =>
    [
      'relative block bg-white dark:bg-slate-900',
      'border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none',
      AppCardComponent.RADIUS[this.radius()],
      AppCardComponent.PADDING[this.padding()],
      this.variant() === 'interactive' ? 'transition-colors duration-500 hover:border-emerald-500/30' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );
}
