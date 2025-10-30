import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl =
    'https://genuine-nurture-8d44b0e1dc.strapiapp.com/api/contact-messages';

  constructor(private http: HttpClient) {}

  // 1️⃣ Invia il messaggio al backend (salva in Strapi)
  sendMessage(payload: { name: string; email: string; message: string }) {
    return this.http.post(this.apiUrl, { data: payload });
  }
}
