import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

export const NotAuthenticatedGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    router.navigate(['/']);

    return false;
  }

  authService.isLoaded.set(true);
  return true;
};
