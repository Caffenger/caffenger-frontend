import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';
import { AuthResponseDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.backendApiUrl;

  async register(userData: { email: string; password: string }) {
    return this.httpClient.post<AuthResponseDto>(`${this.apiUrl}/auth/sign-up`, userData).pipe(
      tap((response) => {
        if (response.access_token) localStorage.setItem('token', response.access_token);
      }),
    );
  }

  async login(userData: { email: string; password: string }) {
    return this.httpClient.post<AuthResponseDto>(`${this.apiUrl}/auth/sign-in`, userData);
  }
}
