import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const NotAuthenticatedGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
