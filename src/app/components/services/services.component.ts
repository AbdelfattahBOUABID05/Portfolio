import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideLayout, LucideServer, LucideShieldCheck, LucideSmartphone } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface Service {
  title: string;
  description: string;
  icon: Type<any>;
  color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LucideLayout, LucideServer, LucideShieldCheck, LucideSmartphone, ScrollRevealDirective],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  public services = signal<Service[]>([
    {
      title: 'Développement Web Full-Stack',
      description: 'Conception et développement d\'applications web modernes de bout en bout. Interfaces réactives avec Angular (Signals) et architectures backend robustes et sécurisées avec Java Spring Boot, Laravel et Flask.',
      icon: LucideLayout,
      color: 'blue'
    },
    {
      title: 'Développement Mobile Multiplateforme',
      description: 'Création d\'applications mobiles performantes et intuitives pour iOS et Android à partir d\'un code unique avec Flutter & Dart, respectant les meilleures pratiques d\'UI/UX et de gestion d\'état.',
      icon: LucideSmartphone,
      color: 'indigo'
    },
    {
      title: 'Ingénierie DevOps & Automatisation',
      description: 'Mise en place d\'architectures cloud/virtualisées (VMware ESXi), conteneurisation (Docker), et automatisation complète des pipelines d\'intégration et déploiement continus (GitLab CI/CD, Jenkins, Nginx).',
      icon: LucideServer,
      color: 'emerald'
    },
    {
      title: 'Réseaux & Cybersécurité (SecOps)',
      description: 'Audit de sécurité, routage et commutation avancés (Cisco IOS), configuration réseau d\'entreprise (VLANs, NAT, ACLs) et mise en place de systèmes de supervision et analyse de logs automatisée (LogSOC).',
      icon: LucideShieldCheck,
      color: 'rose'
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
