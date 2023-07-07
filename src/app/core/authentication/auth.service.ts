import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, effect, computed } from '@angular/core';
import { catchError, take, tap, throwError } from 'rxjs';
import { URL } from '../constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  currentUser = signal(null);

  isAuthenticated = computed(() => {
    return !!this.currentUser();
  });

  getMe() {
    const headers = this.getHeaderWithToken();
    return this.http
      .get<any>('http://localhost:3000/auth/me', { headers })
      .pipe(
        take(1),
        tap((user) => {
          if (!user) return;
          this.currentUser.set(user);
        }),
        catchError((err) => {
          this.logout();
          return throwError(() => new Error(err));
        })
      );
  }

  login(username: string, password: string) {
    return this.http.post(`${URL}auth/login`, { username, password }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      }),
      tap((res: any) => {
        localStorage.setItem('token', res.access_token);
        this.currentUser.set(res);
        this.router.navigate(['/']);
      })
    );
  }

  getHeaderWithToken() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
