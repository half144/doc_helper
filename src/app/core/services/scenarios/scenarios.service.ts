import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { URL } from '../../constants';
import { HttpCacheService } from '../../cache/http-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ScenariosService {
  httpCache = inject(HttpCacheService);
  http = inject(HttpClient);

  getScenarioById(id: string): Observable<any> {
    console.log('getScenarioById', id);
    return this.httpCache.get(`${URL}scenarios/${id}`);
  }

  getAllScenarios() {
    return this.httpCache.get(`${URL}scenarios`);
  }

  saveScenario(scenario: any) {
    return this.http.post(`${URL}scenarios`, scenario).pipe(
      tap(() => {
        this.httpCache.invalidateCache(`${URL}scenarios`);
        this.httpCache.invalidateCache(`${URL}scenarios/${scenario.id}`);
      })
    );
  }

  deleteScenario(id: string) {
    return this.http.delete(`${URL}scenarios/${id}`);
  }
}
