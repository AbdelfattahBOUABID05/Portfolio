import { Component, signal, Type, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAward, LucideBriefcase, LucideCpu } from '@lucide/angular';
import { ThemeService } from '../../services/theme';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface PhysicsLogo {
  img: any; // Use any for SSR safety, initialized as HTMLImageElement only in browser
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Certification {
  name: string;
  pdf: string;
  badge: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAward, LucideBriefcase, LucideCpu, ScrollRevealDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  readonly Award = LucideAward;
  readonly Briefcase = LucideBriefcase;
  readonly Cpu = LucideCpu;

  private themeService = inject(ThemeService);
  public isDarkMode = this.themeService.isDarkMode;

  @ViewChild('physicsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('physicsContainer') containerRef!: ElementRef<HTMLElement>;

  public isCertListOpen = signal<boolean>(false);

  public certifications: Certification[] = [
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

  public stats = signal<{ label: string; value: string; icon: Type<any> }[]>([
    { label: 'Certifications', value: '8+', icon: LucideAward },
    { label: 'Projets Réalisés', value: '5+', icon: LucideBriefcase },
    { label: 'Technologies', value: '15+', icon: LucideCpu }
  ]);

  private animationId?: number;
  private mousePos = { x: -1000, y: -1000 };
  private logos: PhysicsLogo[] = [];
  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private resizeListener?: () => void;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public toggleCertList(event: Event) {
    event.stopPropagation();
    this.isCertListOpen.update(prev => !prev);
  }

  public openFile(url: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  public closeCertList() {
    this.isCertListOpen.set(false);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initPhysicsLogos().then(() => {
        this.initCanvas();
        
        this.ngZone.runOutsideAngular(() => {
          this.animate();
        });

        this.resizeListener = () => this.initCanvas();
        window.addEventListener('resize', this.resizeListener);
      }).catch(err => {
        console.error('Erreur lors du chargement des logos:', err);
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
      }
    }
  }

  private async initPhysicsLogos(): Promise<void> {
    const logoFiles = [
      'angular-icon-seeklogo.png', 'cisco-seeklogo.png', 'css3-seeklogo.png',
      'docker-seeklogo.png', 'flask-seeklogo.png', 'html5-seeklogo.png',
      'java-script-js-seeklogo.png', 'jenkins-seeklogo.png', 'laravel-seeklogo.png','oracle-seeklogo.png',
      'linux-tux-seeklogo.png', 'python-seeklogo.png', 'spring-boot-seeklogo.png', 'mysql-seeklogo.png',
      'tailwind-css-seeklogo.png', 'typescript-seeklogo.png', 'windows-seeklogo.png', 'php-seeklogo.png'
    ];

    const loadPromises = logoFiles.map(file => {
      return new Promise<PhysicsLogo | null>((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            img,
            name: file.split('-')[0],
            x: Math.random() * 300,
            y: Math.random() * 300,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: 50,
            opacity: 0.7 + Math.random() * 0.3
          });
        };
        img.onerror = () => {
          console.warn(`Impossible de charger le logo: ${file}. Il sera ignoré.`);
          resolve(null); // On résout avec null pour ne pas bloquer les autres logos
        };
        img.src = `assets/logo/${file}`;
      });
    });

    const results = await Promise.all(loadPromises);
    this.logos = results.filter((logo): logo is PhysicsLogo => logo !== null);
  }

  private initCanvas() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    
    this.width = rect.width;
    this.height = rect.height;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }

    this.logos.forEach(l => {
      if (l.x > this.width) l.x = Math.random() * (this.width - l.size);
      if (l.y > this.height) l.y = Math.random() * (this.height - l.size);
    });
  }

  onMouseMove(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mousePos.x = event.clientX - rect.left;
      this.mousePos.y = event.clientY - rect.top;
    }
  }

  onMouseLeave() {
    this.mousePos = { x: -1000, y: -1000 };
  }

  private animate() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.updatePhysics();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private updatePhysics() {
    const friction = 0.995;
    const repulsionRadius = 150;
    const repulsionStrength = 0.8;

    for (let i = 0; i < this.logos.length; i++) {
      const l = this.logos[i];

      l.x += l.vx;
      l.y += l.vy;
      l.vx *= friction;
      l.vy *= friction;

      if (Math.abs(l.vx) < 0.5) l.vx += (Math.random() - 0.5) * 0.5;
      if (Math.abs(l.vy) < 0.5) l.vy += (Math.random() - 0.5) * 0.5;

      if (l.x <= 0) { l.x = 0; l.vx = Math.abs(l.vx) * 0.8; }
      if (l.x >= this.width - l.size) { l.x = this.width - l.size; l.vx = -Math.abs(l.vx) * 0.8; }
      if (l.y <= 0) { l.y = 0; l.vy = Math.abs(l.vy) * 0.8; }
      if (l.y >= this.height - l.size) { l.y = this.height - l.size; l.vy = -Math.abs(l.vy) * 0.8; }

      const dxMouse = (l.x + l.size / 2) - this.mousePos.x;
      const dyMouse = (l.y + l.size / 2) - this.mousePos.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < repulsionRadius) {
        const force = (repulsionRadius - distMouse) / repulsionRadius;
        l.vx += (dxMouse / distMouse) * force * repulsionStrength;
        l.vy += (dyMouse / distMouse) * force * repulsionStrength;
      }

      for (let j = i + 1; j < this.logos.length; j++) {
        const l2 = this.logos[j];
        const dx = (l.x + l.size / 2) - (l2.x + l2.size / 2);
        const dy = (l.y + l.size / 2) - (l2.y + l2.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (l.size + l2.size) / 2;

        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          const overlap = minDistance - distance;
          l.x += Math.cos(angle) * overlap / 2;
          l.y += Math.sin(angle) * overlap / 2;
          l2.x -= Math.cos(angle) * overlap / 2;
          l2.y -= Math.sin(angle) * overlap / 2;

          const tempVx = l.vx;
          const tempVy = l.vy;
          l.vx = l2.vx * 0.9;
          l.vy = l2.vy * 0.9;
          l2.vx = tempVx * 0.9;
          l2.vy = tempVy * 0.9;
        }
      }
    }
  }

  private draw() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.logos.forEach(l => {
      this.ctx!.save();
      this.ctx!.globalAlpha = l.opacity;
      this.ctx!.shadowBlur = 15;
      this.ctx!.shadowColor = 'rgba(59, 130, 246, 0.2)';
      
      if (l.img && l.img.complete) {
        this.ctx!.drawImage(l.img, l.x, l.y, l.size, l.size);
      }
      this.ctx!.restore();
    });
  }
}
