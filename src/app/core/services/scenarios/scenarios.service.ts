import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class ScenariosService {
  http = inject(HttpClient);

  getScenarioById(id: string): Observable<any> {
    return this.http.get<any>(`${URL}scenarios/${id}`);
  }

  getAllScenarios() {
    return this.http.get<any>(`${URL}scenarios`);
  }

  saveScenario(scenario: any) {
    return this.http.post(`${URL}scenarios`, scenario);
  }
}
