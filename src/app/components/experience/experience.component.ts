import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideShieldCheck, LucideNetwork, LucideMonitor } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  activities: string[];
  icon: Type<any>;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideShieldCheck, LucideNetwork, LucideMonitor, ScrollRevealDirective],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  readonly ShieldCheck = LucideShieldCheck;
  readonly Network = LucideNetwork;
  readonly Monitor = LucideMonitor;

  public experiences = signal<ExperienceItem[]>([
    {
      title: 'Stagiaire en Ingénierie Systèmes & DevOps',
      company: 'Attijariwafa Bank',
      location: 'Siège Social, Casablanca',
      period: 'AVRIL 2026 - JUIN 2026',
      icon: LucideMonitor,
      activities: [
        'Optimisation de l\'infrastructure système et fiabilisation des environnements de serveurs bancaires, assurant une haute disponibilité des services.',
        'Industrialisation du cycle de vie des applications web : conteneurisation via Docker pour la scalabilité, et déploiement continu avec GitLab CI/CD pour accélérer les mises à jour.',
        'Conception du système <span class="text-emerald-400 font-bold text-shadow-sm">LogSOC</span> : plateforme de monitoring intelligent et de supervision des systèmes web, améliorant la disponibilité et la performance des services via l\'analyse prédictive des logs.'
      ]
    },
    {
      title: 'Stagiaire en Réseaux & Télécommunications',
      company: 'TSM (Technologie de Service Mondial)',
      location: 'Casablanca',
      period: 'MARS 2025 - AVRIL 2025',
      icon: LucideNetwork,
      activities: [
        'Installation physique, câblage et configuration avancée d\'équipements réseaux de niveau Enterprise (Routeurs et Commutateurs <span class="text-blue-400 font-bold text-shadow-sm">Huawei</span> et <span class="text-blue-400 font-bold text-shadow-sm">Juniper</span>).',
        'Implémentation des protocoles de routage et de commutation, sécurisation des accès (<span class="text-blue-400 font-bold text-shadow-sm">VLANs</span>, ACLs) et diagnostic de pannes sur des liaisons télécoms critiques.',
        'Support technique de niveau 2 pour assurer la haute disponibilité de l\'infrastructure réseau des clients de l\'entreprise.'
      ]
    },
    {
      title: 'Stagiaire en Informatique & Systèmes',
      company: 'Province de Sefrou',
      location: 'Sefrou',
      period: 'JUILLET 2024 - AOÛT 2024',
      icon: LucideMonitor,
      activities: [
        'Déploiement, configuration d\'équipements réseaux locaux (LAN) et optimisation du plan d\'adressage IP pour les différents services administratifs.',
        'Gestion opérationnelle du parc informatique : installation des systèmes d\'exploitation (<span class="text-blue-400 font-bold text-shadow-sm">Windows</span>/<span class="text-blue-400 font-bold text-shadow-sm">Linux</span>), maintenance préventive/curative du matériel et déploiement d\'images système.',
        'Assistance technique et support de proximité de niveau 1 et 2 pour la résolution des incidents logiciels et réseau.'
      ]
    },
    {
      title: 'Gestionnaire d\'Espace Informatique',
      company: 'Bibliothèque Informatique',
      location: 'Errachidia',
      period: 'AOÛT 2023 - SEPTEMBRE 2023',
      icon: LucideShieldCheck,
      activities: [
        'Administration au quotidien du réseau local de l\'espace informatique (gestion des droits d\'accès, routage de base et sécurité du Wi-Fi public).',
        'Maintenance logicielle et matérielle du parc (désinfection de malwares, mises à jour critiques, optimisation des performances systèmes).',
        'Support utilisateur, formation de proximité aux outils numériques et résolution des problèmes de connectivité.'
      ]
    }
  ]);
}
