import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, effect, computed } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { URL } from '../constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  currentUser = signal<any>(null);
  isLoaded = signal(false);
  isAuthenticated = computed(() => {
    return !!this.currentUser();
  });

  updateUser = new Subject<any>();
  private readonly updateUserSub = this.updateUser
    .pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.getMe();
      })
    )
    .subscribe();

  getMe() {
    return this.http.get<any>(`${URL}auth/me`).pipe(
      take(1),
      tap((user) => {
        if (!user) return;

        this.currentUser.set(user);
      }),
      catchError((err) => {
        this.logout();
        return throwError(() => err.error.message);
      })
    );
  }

  login(username: string, password: string, stayConnected: boolean) {
    return this.http.post(`${URL}auth/login`, { username, password }).pipe(
      catchError((err) => {
        return throwError(() => err.error.message);
      }),
      tap((res: any) => {
        if (stayConnected) {
          localStorage.setItem('token', res.access_token);
        }
        this.currentUser.set(res);

        this.router.navigate(['/']);
      })
    );
  }

  register(username: string, password: string, fullname: string) {
    return this.http
      .post(`${URL}auth/register`, { username, password, fullname })
      .pipe(
        catchError((err) => {
          return throwError(() => err.error.message);
        }),
        tap((res: any) => {
          localStorage.setItem('token', res.access_token);
          this.currentUser.set(res);
          this.router.navigate(['/']);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
