import { Injectable, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  loggedIn = signal(this.hasToken());

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.set(false);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.role;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
