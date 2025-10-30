import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api`;

  private apiUrl = this.baseUrl + '/contact-messages';

  constructor(private http: HttpClient) {}

  // 1️⃣ Invia il messaggio al backend (salva in Strapi)
  sendMessage(payload: { name: string; email: string; message: string }) {
    return this.http.post(this.apiUrl, { data: payload });
  }
}
