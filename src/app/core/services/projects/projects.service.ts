import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { HttpCacheService } from '../../cache/http-cache.service';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  http = inject(HttpCacheService);
  httpNative = inject(HttpClient);
  authService = inject(AuthService);

  getProjectData(id) {
    return this.http.get(`${URL}projects/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  exitProject(id) {
    return this.httpNative.delete(`${URL}projects/exit/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      }),
      tap(() => {
        this.authService.updateUser.next(true);
      })
    );
  }

  createProject(projectInfo) {
    return this.httpNative.post('${URL}projects', projectInfo).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      }),
      tap(() => {
        this.authService.updateUser.next(true);
      })
    );
  }

  createInviteLink(id) {
    return this.httpNative.post(`${URL}projects/invite/${id}`, {}).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  acceptInvite(inviteToken) {
    return this.http.get(`${URL}projects/invite/${inviteToken}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      }),
      tap(() => {
        this.authService.updateUser.next(true);
      })
    );
  }
}
