import { Component, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideMail, LucideMessageSquare, LucideBriefcase, LucideCodeXml, LucideCopy, LucideCheck } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, LucideMail, LucideMessageSquare, LucideBriefcase, LucideCodeXml, LucideCopy, LucideCheck, ScrollRevealDirective, TranslatePipe],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  readonly LucideMessageSquare = LucideMessageSquare;
  readonly LucideLinkedin = LucideBriefcase;
  readonly LucideGithub = LucideCodeXml;
  readonly LucideMail = LucideMail;
  readonly LucideCopy = LucideCopy;
  readonly LucideCheck = LucideCheck;

  public copied = signal(false);
  private email = 'abdelfattahbouabid123@gmail.com';

  public channels = signal<{ nameKey: string; icon: Type<any>; link: string; color: string }[]>([
    { nameKey: 'contact.channels.whatsapp', icon: LucideMessageSquare, link: 'https://wa.me/qr/4LFFQ752RTDTO1', color: 'hover:text-[#25D366]' },
    { nameKey: 'contact.channels.linkedin', icon: LucideBriefcase, link: 'https://www.linkedin.com/in/abdelfattah-bouabid-150a56335', color: 'hover:text-[#0077B5]' },
    { nameKey: 'contact.channels.github', icon: LucideCodeXml, link: 'https://github.com/AbdelfattahBOUABID05', color: 'hover:text-white' },
    { nameKey: 'contact.channels.email', icon: LucideMail, link: `mailto:${this.email}`, color: 'hover:text-blue-500' }
  ]);

  copyEmail() {
    navigator.clipboard.writeText(this.email);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
