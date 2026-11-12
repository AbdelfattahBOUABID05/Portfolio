import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONTACT_CONFIG } from '../config/contact.config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Envoi du formulaire de contact vers Formspree.
 * L'en-tête `Accept: application/json` est indispensable : sans lui,
 * Formspree répond par une redirection HTML (et non du JSON exploitable).
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<void> {
    return this.http.post<void>(CONTACT_CONFIG.endpoint, payload, {
      headers: new HttpHeaders({ Accept: 'application/json' })
    });
  }
}
