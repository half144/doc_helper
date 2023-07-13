import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { HttpCacheService } from '../../cache/http-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  http = inject(HttpCacheService);
  httpNative = inject(HttpClient);
  authService = inject(AuthService);

  getProjectData(id) {
    return this.http.get(`http://localhost:3000/projects/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  exitProject(id) {
    return this.httpNative
      .delete(`http://localhost:3000/projects/exit/${id}`)
      .pipe(
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
    return this.httpNative
      .post('http://localhost:3000/projects', projectInfo)
      .pipe(
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
    return this.httpNative
      .post(`http://localhost:3000/projects/invite/${id}`, {})
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  acceptInvite(inviteToken) {
    return this.http
      .get(`http://localhost:3000/projects/invite/${inviteToken}`)
      .pipe(
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
