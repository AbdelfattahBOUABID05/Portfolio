import { Type } from '@angular/core';
import {
  LucideCpu,
  LucideDatabase,
  LucideFileText,
  LucideHeartHandshake,
  LucideInfinity,
  LucideLayout,
  LucideMonitor,
  LucideNetwork,
  LucideServer,
  LucideShield,
  LucideShieldCheck,
  LucideSmartphone,
  LucideZap
} from '@lucide/angular';

/**
 * Source unique des données du portfolio.
 * Les composants (About, Skills, Experience, Projects) et la section Impact
 * consomment ces constantes : les compteurs restent justes sans intervention
 * quand on ajoute/retire un projet, une compétence, une certification ou une expérience.
 */

/** Langues prises en charge par l'application (FR / EN / AR). */
export const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'] as const;

export interface Project {
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  featuresKey: string;
  technologies: string[];
  icon: Type<unknown>;
  slug: string;
  githubUrl?: string;
  liveUrl?: string;
  hasCaseStudy?: boolean;
  caseStudyKey?: string;
  index: number;
}

export interface SkillCategory {
  titleKey: string;
  icon: Type<unknown>;
  color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate';
  categoryKey: 'frontendMobile' | 'backendApis' | 'devopsCloud' | 'networkSecurity' | 'digitalDesignDocs';
}

export interface Certification {
  name: string;
  pdf: string;
  badge: string;
}

export interface ExperienceItem {
  titleKey: string;
  companyKey: string;
  locationKey: string;
  periodKey: string;
  activitiesKey: string;
  icon: Type<unknown>;
  index: number;
}

export const PROJECTS: readonly Project[] = [
  {
    titleKey: 'projectsList.0.title',
    categoryKey: 'projectsList.0.category',
    descriptionKey: 'projectsList.0.description',
    featuresKey: 'projectsList.0.features',
    technologies: ['Angular', 'Flask', 'GitLab CI/CD', 'Docker', 'Nginx', 'Google Gemini'],
    icon: LucideCpu,
    slug: 'logsoc',
    hasCaseStudy: true,
    caseStudyKey: 'caseStudies.logsoc',
    index: 0
  },
  {
    titleKey: 'projectsList.1.title',
    categoryKey: 'projectsList.1.category',
    descriptionKey: 'projectsList.1.description',
    featuresKey: 'projectsList.1.features',
    technologies: ['Jenkins', 'Docker', 'DevOps', 'CI/CD', 'Automation', 'Git'],
    icon: LucideZap,
    slug: 'cicd-pipeline',
    hasCaseStudy: true,
    caseStudyKey: 'caseStudies.cicdPipeline',
    index: 1
  },
  {
    titleKey: 'projectsList.2.title',
    categoryKey: 'projectsList.2.category',
    descriptionKey: 'projectsList.2.description',
    featuresKey: 'projectsList.2.features',
    technologies: ['Flutter', 'Dart', 'Laravel', 'OOP', 'State Management'],
    icon: LucideSmartphone,
    slug: 'tactix',
    index: 2
  },
  {
    titleKey: 'projectsList.3.title',
    categoryKey: 'projectsList.3.category',
    descriptionKey: 'projectsList.3.description',
    featuresKey: 'projectsList.3.features',
    technologies: ['Cisco IOS', 'Packet Tracer', 'Routing', 'Switching', 'NAT', 'VLANs', 'ACLs'],
    icon: LucideNetwork,
    slug: 'cisco-network',
    index: 3
  },
  {
    titleKey: 'projectsList.4.title',
    categoryKey: 'projectsList.4.category',
    descriptionKey: 'projectsList.4.description',
    featuresKey: 'projectsList.4.features',
    technologies: ['VMware ESXi', 'Windows Server', 'Active Directory', 'DNS', 'Datastores'],
    icon: LucideServer,
    slug: 'virtualization',
    index: 4
  },
  {
    titleKey: 'projectsList.5.title',
    categoryKey: 'projectsList.5.category',
    descriptionKey: 'projectsList.5.description',
    featuresKey: 'projectsList.5.features',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Sanity', 'next-intl', 'next-themes', 'Resend', 'Zod', 'React Hook Form', 'Vercel'],
    icon: LucideHeartHandshake,
    slug: 'motatawi3',
    liveUrl: 'https://motatawi3-sefrou.vercel.app/',
    hasCaseStudy: true,
    caseStudyKey: 'caseStudies.motatawi3',
    index: 5
  }
];

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    titleKey: 'skillCategories.frontendMobile',
    icon: LucideLayout,
    color: 'blue',
    categoryKey: 'frontendMobile'
  },
  {
    titleKey: 'skillCategories.backendApis',
    icon: LucideDatabase,
    color: 'indigo',
    categoryKey: 'backendApis'
  },
  {
    titleKey: 'skillCategories.devopsCloud',
    icon: LucideInfinity,
    color: 'emerald',
    categoryKey: 'devopsCloud'
  },
  {
    titleKey: 'skillCategories.networkSecurity',
    icon: LucideShield,
    color: 'rose',
    categoryKey: 'networkSecurity'
  },
  {
    titleKey: 'skillCategories.digitalDesignDocs',
    icon: LucideFileText,
    color: 'slate',
    categoryKey: 'digitalDesignDocs'
  }
];

export const CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'Enterprise Networking, Security, and Automation',
    pdf: 'assets/certificat/_Enterprise Networking, Security, and Automation.pdf',
    badge: 'assets/certificat/_Enterprise Networking, Security, and AutomationBadge.pdf'
  },
  {
    name: 'Cisco CyberOps Associate',
    pdf: 'assets/certificat/CyberOpsAssociate.pdf',
    badge: 'assets/certificat/CyberOpsAssociateBadge.pdf'
  },
  {
    name: 'Ethical Hacker',
    pdf: 'assets/certificat/Ethical HackerBadge.pdf',
    badge: 'assets/certificat/Ethical HackerBadge.pdf'
  },
  {
    name: 'Cisco IT Essentials 7',
    pdf: 'assets/certificat/IT Essentials 7.pdf',
    badge: 'assets/certificat/ITEssentials7Badge.pdf'
  },
  {
    name: 'Network Technician Career Path',
    pdf: 'assets/certificat/Network Technician Career Path.pdf',
    badge: 'assets/certificat/Network Technician Career PathBadge.pdf'
  },
  {
    name: 'Notions de base sur les réseaux',
    pdf: 'assets/certificat/Notions de base sur les réseaux.pdf',
    badge: 'assets/certificat/Notions de base sur les réseauxBadge.pdf'
  },
  {
    name: 'Python Essentials 1',
    pdf: 'assets/certificat/PythonEssentials1.pdf',
    badge: 'assets/certificat/Python Essentials 1Badge.pdf'
  },
  {
    name: 'Switching, Routing, and Wireless Essentials',
    pdf: 'assets/certificat/SwitchingRoutingWireless.pdf',
    badge: 'assets/certificat/SwitchingRoutingWirelessBadge.pdf'
  }
];

export const EXPERIENCES: readonly ExperienceItem[] = [
  {
    titleKey: 'experienceList.0.title',
    companyKey: 'experienceList.0.company',
    locationKey: 'experienceList.0.location',
    periodKey: 'experienceList.0.period',
    activitiesKey: 'experienceList.0.activities',
    icon: LucideMonitor,
    index: 0
  },
  {
    titleKey: 'experienceList.1.title',
    companyKey: 'experienceList.1.company',
    locationKey: 'experienceList.1.location',
    periodKey: 'experienceList.1.period',
    activitiesKey: 'experienceList.1.activities',
    icon: LucideNetwork,
    index: 1
  },
  {
    titleKey: 'experienceList.2.title',
    companyKey: 'experienceList.2.company',
    locationKey: 'experienceList.2.location',
    periodKey: 'experienceList.2.period',
    activitiesKey: 'experienceList.2.activities',
    icon: LucideMonitor,
    index: 2
  },
  {
    titleKey: 'experienceList.3.title',
    companyKey: 'experienceList.3.company',
    locationKey: 'experienceList.3.location',
    periodKey: 'experienceList.3.period',
    activitiesKey: 'experienceList.3.activities',
    icon: LucideShieldCheck,
    index: 3
  }
];
