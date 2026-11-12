import { ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, signal, Type, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideMail, LucideMessageSquare, LucideBriefcase, LucideCodeXml, LucideCopy, LucideCheck } from '@lucide/angular';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButtonComponent } from '../../shared/button/button.component';
import { AppCardComponent } from '../../shared/card/card.component';
import { ContactService } from '../../services/contact.service';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FieldError {
  key: string;
  params: Record<string, number>;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, LucideCopy, LucideCheck, ScrollRevealDirective, TranslatePipe, AppButtonComponent, AppCardComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  readonly LucideMessageSquare = LucideMessageSquare;
  readonly LucideLinkedin = LucideBriefcase;
  readonly LucideGithub = LucideCodeXml;
  readonly LucideMail = LucideMail;
  readonly LucideCopy = LucideCopy;
  readonly LucideCheck = LucideCheck;

  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly platformId = inject(PLATFORM_ID);

  public readonly email = 'abdelfattahbouabid123@gmail.com';
  public readonly mailtoLink = `mailto:${this.email}`;

  public readonly copied = signal(false);
  public readonly status = signal<FormStatus>('idle');
  public readonly submitted = signal(false);

  public readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    // Honeypot anti-spam : doit rester vide (aucun validateur).
    _gotcha: ['']
  });

  @ViewChild('nameInput') private nameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') private emailInput?: ElementRef<HTMLInputElement>;
  @ViewChild('messageInput') private messageInput?: ElementRef<HTMLTextAreaElement>;

  public channels = signal<{ nameKey: string; icon: Type<any>; link: string; color: string }[]>([
    { nameKey: 'contact.channels.whatsapp', icon: LucideMessageSquare, link: 'https://wa.me/abdo_._bd', color: 'hover:text-[#25D366]' },
    { nameKey: 'contact.channels.linkedin', icon: LucideBriefcase, link: 'https://www.linkedin.com/in/abdelfattah-bouabid-150a56335', color: 'hover:text-[#0077B5]' },
    { nameKey: 'contact.channels.github', icon: LucideCodeXml, link: 'https://github.com/AbdelfattahBOUABID05', color: 'hover:text-white' },
    { nameKey: 'contact.channels.email', icon: LucideMail, link: `mailto:${this.email}`, color: 'hover:text-blue-500' }
  ]);

  /** Message d'erreur à afficher pour un champ (ou `null` s'il est valide / non soumis). */
  public fieldError(control: AbstractControl): FieldError | null {
    if (!this.submitted() || control.valid) {
      return null;
    }
    if (control.hasError('required')) {
      return { key: 'contact.form.errRequired', params: {} };
    }
    if (control.hasError('email')) {
      return { key: 'contact.form.errEmail', params: {} };
    }
    if (control.hasError('minlength')) {
      return { key: 'contact.form.errMinLength', params: { min: control.getError('minlength').requiredLength } };
    }
    if (control.hasError('maxlength')) {
      return { key: 'contact.form.errMaxLength', params: { max: control.getError('maxlength').requiredLength } };
    }
    return null;
  }

  public onSubmit(): void {
    this.submitted.set(true);

    // Honeypot rempli => robot : on simule un succès, sans appel réseau.
    if (this.form.controls._gotcha.value) {
      this.status.set('success');
      return;
    }

    if (this.form.invalid) {
      this.focusFirstInvalid();
      return;
    }

    this.status.set('loading');
    const { name, email, message } = this.form.getRawValue();

    this.contactService.send({ name, email, message }).subscribe({
      next: () => {
        this.status.set('success');
        this.submitted.set(false);
        this.form.reset({ name: '', email: '', message: '', _gotcha: '' });
      },
      error: () => {
        // Message générique : aucun détail technique exposé.
        this.status.set('error');
      }
    });
  }

  public copyEmail(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      void navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Presse-papiers indisponible (permission refusée, contexte non sécurisé) :
      // on conserve le comportement silencieux.
    }
  }

  private focusFirstInvalid(): void {
    if (this.form.controls.name.invalid) {
      this.nameInput?.nativeElement.focus();
      return;
    }
    if (this.form.controls.email.invalid) {
      this.emailInput?.nativeElement.focus();
      return;
    }
    if (this.form.controls.message.invalid) {
      this.messageInput?.nativeElement.focus();
    }
  }
}
