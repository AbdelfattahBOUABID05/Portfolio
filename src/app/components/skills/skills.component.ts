import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideLayout, LucideDatabase, LucideInfinity, LucideShield, LucideFileText } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  icon: Type<any>;
  skills: Skill[];
  color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, LucideLayout, LucideDatabase, LucideInfinity, LucideShield, LucideFileText, ScrollRevealDirective],
  templateUrl: './skills.component.html'
})
export class SkillsComponent {
  public categories = signal<SkillCategory[]>([
    {
      title: 'Frontend & Mobile',
      icon: LucideLayout,
      color: 'blue',
      skills: [
        { name: 'Angular' }, { name: 'Flutter' }, { name: 'Dart' }, { name: 'HTML5' }, { name: 'CSS3' }, { name: 'Tailwind CSS' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: LucideDatabase,
      color: 'indigo',
      skills: [
        { name: 'Java' }, { name: 'Spring Boot' }, { name: 'PHP' }, { name: 'Laravel' }, { name: 'Flask' }, { name: 'REST APIs' }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: LucideInfinity,
      color: 'emerald',
      skills: [
        { name: 'Docker' }, { name: 'GitLab CI/CD' }, { name: 'Jenkins' }, { name: 'VMware ESXi' }, { name: 'Nginx' }, { name: 'Linux' }, { name: 'Bash/Shell' }
      ]
    },
    {
      title: 'Réseau & Sécurité',
      icon: LucideShield,
      color: 'rose',
      skills: [
        { name: 'Cisco IOS' }, { name: 'CCNA Routing & Switching' }, { name: 'Cisco CyberOps' }, { name: 'Routing & Switching' }, { name: 'VLANs & ACLs' }, { name: 'NAT/DHCP' }
      ]
    },
    {
      title: 'Digital Design & Docs',
      icon: LucideFileText,
      color: 'slate',
      skills: [
        { name: 'Logo Design' }, { name: 'Canva' }, { name: 'Technical Documentation' }, { name: 'Professional Reports (LaTeX)' }
      ]
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
}
