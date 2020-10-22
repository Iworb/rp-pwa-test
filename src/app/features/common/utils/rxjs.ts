import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { unzip, zip } from './array';

type ObservableMap<T> = {
  [P in keyof T]: Observable<T[P]>;
};

type ObservableOrAnyMap<T> = {
  [P in keyof T]: Observable<T[P]> | T[P];
};

export function combineLatestMap<T>(sources: ObservableOrAnyMap<T>): Observable<T> {
  const obs = {} as ObservableMap<T>;
  const vals: object = {};
  Object.keys(sources).forEach(k => {
    if (Observable.prototype.isPrototypeOf(sources[k])) {
      obs[k] = sources[k];
    } else {
      vals[k] = sources[k];
    }
  });
  const sourceEntries = Object.entries<Observable<any>>(obs);
  const [sourceKeys, sourceValues] = unzip(sourceEntries);

  return combineLatest(sourceValues).pipe(
    map((values) => Object.assign({} as T, vals, Object.fromEntries(zip(sourceKeys, values))))
  );
}
