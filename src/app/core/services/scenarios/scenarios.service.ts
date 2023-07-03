import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScenariosService {
  http = inject(HttpClient);

  getScenarioById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/scenarios/${id}`);
  }

  getAllScenarios() {
    return this.http.get<any>('http://localhost:3000/scenarios');
  }

  saveScenario(scenario: any) {
    return this.http.post('http://localhost:3000/scenarios', scenario);
  }
}
