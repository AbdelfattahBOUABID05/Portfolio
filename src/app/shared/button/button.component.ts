import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    @if (href()) {
      <a [href]="href()" [attr.aria-label]="ariaLabel() || null" [class]="hostClasses()">
        <ng-content />
      </a>
    } @else {
      <button
        [attr.type]="type()"
        [attr.aria-label]="ariaLabel() || null"
        [disabled]="disabled()"
        [class]="hostClasses()"
      >
        <ng-content />
      </button>
    }
  `
})
export class AppButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly href = input<string | null>(null);
  readonly ariaLabel = input<string>('');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);

  private static readonly VARIANTS: Record<ButtonVariant, string> = {
    primary:
      'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white',
    secondary:
      'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm dark:shadow-none',
    ghost: 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
  };

  private static readonly SIZES: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm'
  };

  protected readonly hostClasses = computed(() =>
    [
      'inline-flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-colors',
      'rounded-[var(--radius-button)]',
      'disabled:opacity-50 disabled:pointer-events-none',
      AppButtonComponent.SIZES[this.size()],
      AppButtonComponent.VARIANTS[this.variant()]
    ].join(' ')
  );
}
