import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private store = signal({} as any);
  private http = inject(HttpClient);

  public get(url: string, params: any = {}) {
    const cachedStore: any = this.store();
    const cache = cachedStore[url];

    if (cache) {
      return of(cache);
    }

    return this.http.get(url, params).pipe(
      map((res: any) => {
        this.store.set({
          ...cachedStore,
          [url]: res,
        });
        return res;
      }),
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  public invalidateCache(url: string) {
    const cachedStore: any = this.store();
    delete cachedStore[url];
    this.store.set(cachedStore);
  }

  public refetch(url: string, params: any = {}) {
    this.invalidateCache(url);
    return this.get(url, params);
  }
}
