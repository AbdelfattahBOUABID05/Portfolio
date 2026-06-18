import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideLayout, LucideDatabase, LucideInfinity, LucideShield, LucideFileText } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';

interface Skill {
  nameKey: string;
}

interface SkillCategory {
  titleKey: string;
  icon: Type<any>;
  skillCount: number;
  color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate';
  categoryKey: 'frontendMobile' | 'backendApis' | 'devopsCloud' | 'networkSecurity' | 'digitalDesignDocs';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, LucideLayout, LucideDatabase, LucideInfinity, LucideShield, LucideFileText, ScrollRevealDirective, TranslatePipe],
  templateUrl: './skills.component.html'
})
export class SkillsComponent {
  public categories = signal<SkillCategory[]>([
    {
      titleKey: 'skillCategories.frontendMobile',
      icon: LucideLayout,
      color: 'blue',
      skillCount: 6,
      categoryKey: 'frontendMobile'
    },
    {
      titleKey: 'skillCategories.backendApis',
      icon: LucideDatabase,
      color: 'indigo',
      skillCount: 6,
      categoryKey: 'backendApis'
    },
    {
      titleKey: 'skillCategories.devopsCloud',
      icon: LucideInfinity,
      color: 'emerald',
      skillCount: 7,
      categoryKey: 'devopsCloud'
    },
    {
      titleKey: 'skillCategories.networkSecurity',
      icon: LucideShield,
      color: 'rose',
      skillCount: 6,
      categoryKey: 'networkSecurity'
    },
    {
      titleKey: 'skillCategories.digitalDesignDocs',
      icon: LucideFileText,
      color: 'slate',
      skillCount: 4,
      categoryKey: 'digitalDesignDocs'
    }
  ]);

  getCategoryClasses(color: string): string {
    const base = 'relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none ';
    return base;
  }

  getBadgeClasses(color: string): string {
    const base = 'px-4 py-1.5 text-xs font-bold rounded-lg border ';
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/10 dark:border-blue-500/20',
      indigo: 'bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/10 dark:border-indigo-500/20',
      emerald: 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 dark:border-emerald-500/20',
      rose: 'bg-rose-500/5 text-rose-600 dark:text-rose-400 border-rose-500/10 dark:border-rose-500/20',
      slate: 'bg-slate-500/5 text-slate-500 dark:text-slate-400 border-slate-500/10 dark:border-slate-500/20'
    };
    return base + (colors[color] || '');
  }

  getIconClasses(color: string): string {
    const base = 'w-12 h-12 rounded-xl flex items-center justify-center transition-colors ';
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-500',
      indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-500',
      emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500',
      rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-500',
      slate: 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
    };
    return base + (colors[color] || '');
  }

  getIndices(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
}
