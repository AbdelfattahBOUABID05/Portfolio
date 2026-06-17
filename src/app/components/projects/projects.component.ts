import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCodeXml, LucideExternalLink, LucideZap, LucideCpu, LucideNetwork, LucideServer, LucideSmartphone } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface Project {
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: any;
  github: string;
  live: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideCodeXml, LucideExternalLink, LucideZap, LucideCpu, LucideNetwork, LucideServer, LucideSmartphone, ScrollRevealDirective],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  readonly LucideGithub = LucideCodeXml;
  readonly LucideExternalLink = LucideExternalLink;

  public projects = signal<Project[]>([
    {
      title: 'LogSOC : Plateforme intelligente d’analyse et de supervision des logs systèmes',
      category: 'Full-Stack / AI',
      description: 'Plateforme dédiée à la centralisation, l’analyse automatisée et la détection d’anomalies sur les logs systèmes, avec intégration d’intelligence artificielle pour accélérer le diagnostic et renforcer la supervision.',
      features: [
        'Architecture unifiée et scalable pour une centralisation homogène des données et une visualisation temps réel.',
        'Automatisation complète des cycles de vie pour une fiabilité optimale et une mise en production accélérée.',
        'Sécurisation robuste du déploiement avec une approche stratégique pour garantir la disponibilité et la résilience.'
      ],
      technologies: ['Angular', 'Spring Boot', 'Laravel', 'GitLab CI/CD', 'Docker', 'Nginx', 'LLM'],
      icon: LucideCpu,
      github: '#',
      live: '#'
    },
    {
      title: 'Automated CI/CD Infrastructure Pipeline',
      category: 'DevOps',
      description: 'Infrastructure DevOps complète pour industrialiser le cycle de vie des applications, du code source jusqu\'à la production.',
      features: [
        'Industrialisation complète du déploiement pour accélérer les cycles de livraison.',
        'Réduction des erreurs humaines grâce à l\'automatisation des étapes de build, test et validation.',
        'Garantie de la qualité du code via des portes de validation intégrées aux pipelines.'
      ],
      technologies: ['Jenkins', 'DevOps', 'CI/CD', 'Automation', 'Git'],
      icon: LucideZap,
      github: '#',
      live: '#'
    },
    {
      title: 'Tactix – Application Mobile de Stratégie Football',
      category: 'Mobile',
      description: 'Application mobile multiplateforme dédiée à l\'élaboration de tactiques, au suivi des performances et à la gestion d\'équipes de football.',
      features: [
        'Développement Cross-Platform pour une expérience utilisateur fluide sur tous les appareils.',
        'Gestion optimisée des états pour un rendu dynamique et réactif des données de match et des tableaux tactiques.'
      ],
      technologies: ['Flutter', 'Dart', 'OOP', 'State Management'],
      icon: LucideSmartphone,
      github: '#',
      live: '#'
    },
    {
      title: 'Cisco Enterprise Network Infrastructure',
      category: 'Réseau / NetOps',
      description: 'Architecture réseau d\'entreprise sécurisée et résiliente, garantissant la fiabilité et la connectivité des services critiques.',
      features: [
        'Segmentation stratégique du trafic pour renforcer la sécurité et optimiser les performances.',
        'Sécurisation robuste du périmètre et contrôle des accès pour protéger les actifs informatiques.',
        'Haute disponibilité pour garantir la continuité des services essentiels de l\'entreprise.'
      ],
      technologies: ['Cisco IOS', 'Packet Tracer', 'Routing', 'Switching', 'NAT', 'VLANs', 'ACLs'],
      icon: LucideNetwork,
      github: '#',
      live: '#'
    },
    {
      title: 'Enterprise Virtualization Infrastructure',
      category: 'Cloud & Virtualisation',
      description: 'Infrastructure virtualisée de niveau entreprise pour consolider les ressources et optimiser les charges de travail.',
      features: [
        'Optimisation des charges de travail pour une utilisation efficace des ressources matérielles.',
        'Continuité de service renforcée grâce à la virtualisation et à la gestion des snapshots.',
        'Administration centralisée pour simplifier la gestion des systèmes et des services d\'annuaire.'
      ],
      technologies: ['VMware ESXi', 'Windows Server', 'Active Directory', 'DNS', 'Datastores'],
      icon: LucideServer,
      github: '#',
      live: '#'
    }
  ]);
}
