import { CanActivateFn } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { inject } from '@angular/core';

export const jwtGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return true;
};
