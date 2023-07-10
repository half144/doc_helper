import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

export const JWTGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    authService.isLoaded.set(true);
    return true;
  }

  if (!localStorage.getItem('token')) {
    authService.isLoaded.set(true);
    router.navigate(['/login']);
    return false;
  }

  return authService.getMe().pipe(
    tap(() => {
      authService.isLoaded.set(true);
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
