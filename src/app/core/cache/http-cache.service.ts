import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private store = signal({} as any);
  private http = inject(HttpClient);

  refresh$ = new BehaviorSubject(null);

  public get(url: string, params: any = {}) {
    const cachedStore: any = this.store();
    const cache = cachedStore[url];

    if (cache) {
      return of(cache);
    }

    return this.refresh$.pipe(
      switchMap(() =>
        this.http.get(url, params).pipe(
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
        )
      )
    );
  }

  public invalidateCache(url: string) {
    const cachedStore: any = this.store();
    delete cachedStore[url];
    this.store.set(cachedStore);
    this.refresh$.next(null);
  }
}
