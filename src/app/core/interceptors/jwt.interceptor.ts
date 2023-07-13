import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authServices: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token =
      localStorage.getItem('token') ||
      this.authServices.currentUser()?.access_token ||
      '';

    if (token) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
