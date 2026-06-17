import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCodeXml, LucideBriefcase, LucideMail } from '@lucide/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideCodeXml, LucideBriefcase, LucideMail],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly LucideGithub = LucideCodeXml;
  readonly LucideLinkedin = LucideBriefcase;
  readonly LucideMail = LucideMail;

  public currentYear = new Date().getFullYear();
}
