import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost:1337/api/contact-messages';

  constructor(private http: HttpClient) {}

  // 1️⃣ Invia il messaggio al backend (salva in Strapi)
  sendMessage(payload: { name: string; email: string; message: string }) {
    return this.http.post(this.apiUrl, { data: payload });
  }
}
