import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private store = new BehaviorSubject<any>({});
  private http = inject(HttpClient);

  private refresh$ = new BehaviorSubject<string | null>(null);

  public get(url: string, params: any = {}) {
    const cachedStore: any = this.store.getValue();
    const cache = cachedStore[url];

    if (cache) {
      return of(cache);
    }

    return this.refresh$.pipe(
      filter((refreshUrl) => refreshUrl === url),
      switchMap(() =>
        this.http.get(url, params).pipe(
          map((res: any) => {
            this.store.next({
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
    this.store.next({
      ...this.store.getValue(),
      [url]: null,
    });

    this.refresh$.next(url);
  }
}
