import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  of,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private http = inject(HttpClient);

  private store = new BehaviorSubject<any>({});
  private refresh$ = new BehaviorSubject<string | null>(null);

  public get<T>(url: string, options?: HttpOptions): Observable<T> {
    const cachedStore = this.store.getValue();
    const cache = cachedStore[url];

    const requestStream$ = cache ? of(cache) : this.http.get<T>(url, options).pipe(
      tap((res) => this.saveInCache(url, res)),
    );

    return this.refresh$.pipe(
      startWith(url),
      filter((refreshUrl) => refreshUrl === url),
      switchMap(() => requestStream$),
      catchError((err) => throwError(() => err)));
  }

  public invalidateCache(url: string) {
    this.store.next({
      ...this.store.getValue(),
      [url]: null,
    });

    this.refresh$.next(url);
  }

  public invalidadeManyCache(urls: string[]) {
    const cachedStore = this.store.getValue();

    urls.forEach((url) => {
      cachedStore[url] = null;
    });
    this.store.next(cachedStore);
  }

  private saveInCache(url: string, data: any) {
    this.store.next({
      ...this.store.getValue(),
      [url]: data,
    });
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
