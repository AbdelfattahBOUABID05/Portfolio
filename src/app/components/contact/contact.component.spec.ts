import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { ContactComponent } from './contact.component';
import { CONTACT_CONFIG } from '../../config/contact.config';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    // jsdom n'implémente pas window.matchMedia (utilisé par ScrollRevealDirective).
    window.matchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideTranslateService()],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  function fillValidForm(): void {
    component.form.setValue({
      name: 'Abdelfattah',
      email: 'abdelfattah@example.com',
      message: 'Bonjour, je souhaite discuter d’un projet DevOps.',
      _gotcha: '',
    });
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should stay invalid and send nothing when the form is empty', () => {
    component.onSubmit();

    expect(component.form.invalid).toBe(true);
    expect(component.submitted()).toBe(true);
    httpMock.expectNone(CONTACT_CONFIG.endpoint);
  });

  it('should reject an invalid email address without sending anything', () => {
    fillValidForm();
    component.form.controls.email.setValue('not-an-email');

    component.onSubmit();

    expect(component.form.controls.email.invalid).toBe(true);
    expect(component.status()).toBe('idle');
    httpMock.expectNone(CONTACT_CONFIG.endpoint);
  });

  it('should not send anything when the honeypot is filled', () => {
    fillValidForm();
    component.form.controls._gotcha.setValue('spam-bot');

    component.onSubmit();

    httpMock.expectNone(CONTACT_CONFIG.endpoint);
    expect(component.status()).toBe('success');
    expect(component.form.controls.name.value).toBe('Abdelfattah');
  });

  it('should send the payload and switch to success on a 200 response', () => {
    fillValidForm();

    component.onSubmit();

    const req = httpMock.expectOne(CONTACT_CONFIG.endpoint);
    expect(req.request.method).toBe('POST');
    req.flush(null);

    expect(component.status()).toBe('success');
    expect(component.form.controls.name.value).toBe('');
  });

  it('should switch to error on a network failure and expose a mailto fallback', () => {
    fillValidForm();

    component.onSubmit();

    const req = httpMock.expectOne(CONTACT_CONFIG.endpoint);
    req.flush('boom', { status: 500, statusText: 'Server Error' });

    expect(component.status()).toBe('error');
    expect(component.mailtoLink.startsWith('mailto:')).toBe(true);
  });
});
