import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { URL } from '../../constants';
import { HttpCacheService } from '../../cache/http-cache.service';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScenariosService {
  httpCache = inject(HttpCacheService);
  http = inject(HttpClient);
  authService = inject(AuthService);

  getScenarioById(id: string): Observable<any> {
    console.log('getScenarioById', id);
    return this.httpCache.get(`${URL}scenarios/${id}`);
  }

  getAllScenarios() {
    return this.httpCache.get(`${URL}scenarios`);
  }

  saveScenario(scenario: any, projectId: string) {
    return this.http.post(`${URL}projects/${projectId}/cards`, scenario).pipe(
      tap(() => {
        this.httpCache.invalidateCache(`${URL}projects/${projectId}`);
        this.httpCache.invalidateCache(`${URL}scenarios/${scenario.id}`);
      })
    );
  }

  deleteScenario(id: string) {
    return this.http.delete(`${URL}scenarios/${id}`);
  }
}
