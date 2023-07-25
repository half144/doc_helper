import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private store = new BehaviorSubject<any>({});
  private http = inject(HttpClient);

  private refresh$ = new BehaviorSubject<string | null>(null);

  public get<T>(url: string, options?: HttpOptions): Observable<T> {
    const cachedStore: any = this.store.getValue();
    const cache = cachedStore[url];

    if (cache) {
      return of(cache);
    }

    return this.refresh$.pipe(
      startWith(url),
      filter((refreshUrl) => refreshUrl === url),
      switchMap(() =>
        this.http.get<T>(url, options).pipe(
          map((res) => {
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

interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: any;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType: any;
  withCredentials?: boolean;
}
