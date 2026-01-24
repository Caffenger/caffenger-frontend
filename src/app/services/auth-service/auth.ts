import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.backendApiUrl;

  async register(userData: { email: string; password: string }) {
    return this.httpClient.post(`${this.apiUrl}/auth/sign-up`, userData);
  }

  async login(userData: { email: string; password: string }) {
    return this.httpClient.post(`${this.apiUrl}/auth/sign-in`, userData);
  }
}
