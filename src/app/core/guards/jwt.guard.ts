import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const JWTGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  if (!localStorage.getItem('token')) {
    router.navigate(['/login']);
    return false;
  }

  return authService.getMe().pipe(
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
