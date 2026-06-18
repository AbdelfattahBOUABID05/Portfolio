import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideLayout, LucideServer, LucideShieldCheck, LucideSmartphone } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';

interface Service {
  titleKey: string;
  descriptionKey: string;
  icon: Type<any>;
  color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate';
  index: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LucideLayout, LucideServer, LucideShieldCheck, LucideSmartphone, ScrollRevealDirective, TranslatePipe],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  public services = signal<Service[]>([
    {
      titleKey: 'servicesList.0.title',
      descriptionKey: 'servicesList.0.description',
      icon: LucideLayout,
      color: 'blue',
      index: 0
    },
    {
      titleKey: 'servicesList.1.title',
      descriptionKey: 'servicesList.1.description',
      icon: LucideSmartphone,
      color: 'indigo',
      index: 1
    },
    {
      titleKey: 'servicesList.2.title',
      descriptionKey: 'servicesList.2.description',
      icon: LucideServer,
      color: 'emerald',
      index: 2
    },
    {
      titleKey: 'servicesList.3.title',
      descriptionKey: 'servicesList.3.description',
      icon: LucideShieldCheck,
      color: 'rose',
      index: 3
    }
  ]);

  getCardClasses(color: string): string {
    const base = 'relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none ';
    return base;
  }

  getIconClasses(color: string): string {
    const base = 'w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner ';
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-500',
      indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-500',
      emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500',
      rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-500',
      slate: 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
    };
    return base + (colors[color] || '');
  }
}
