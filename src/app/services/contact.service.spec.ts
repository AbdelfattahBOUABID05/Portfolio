import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { CONTACT_CONFIG } from '../config/contact.config';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST the payload to the Formspree endpoint with a JSON Accept header', () => {
    const payload = { name: 'Abdelfattah', email: 'abdelfattah@example.com', message: 'Bonjour' };

    service.send(payload).subscribe();

    const req = httpMock.expectOne(CONTACT_CONFIG.endpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Accept')).toBe('application/json');
    expect(req.request.body).toEqual(payload);

    req.flush(null);
  });
});
