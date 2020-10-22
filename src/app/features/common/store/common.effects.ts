import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { fromEvent, merge } from 'rxjs';
import { filter, map, mapTo, startWith, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';
import { WINDOW, WindowWrapper } from '../services/window.service';
import { getAppCommonOnlineManual, setManualAction, setOnlineStatusAction, toggleManualAction } from './common.store';

const COMMON_EFFECTS_INIT = 'COMMON_EFFECTS_INIT';

@Injectable()
export class AppCommonEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private storage: StorageMap,
    private store: Store,
    @Inject(WINDOW) private window: WindowWrapper
  ) {
  }

  init$ = createEffect(() => this.actions$.pipe(
    ofType(COMMON_EFFECTS_INIT),
    switchMapTo(this.storage.get<boolean>('isManual')),
    map((isManual: boolean) => setManualAction({ manual: !!isManual })))
  );

  checkOnline$ = createEffect(() => this.actions$.pipe(
    ofType(setManualAction),
    filter(action => !action.manual),
    switchMap(action => merge(
      fromEvent(this.window, 'online').pipe(mapTo(true)),
      fromEvent(this.window, 'offline').pipe(mapTo(false)),
    ).pipe(startWith(this.window.navigator.onLine))),
    map(status => setOnlineStatusAction({ status }))
  ));

  toggleManual$ = createEffect(() => this.actions$.pipe(
    ofType(toggleManualAction),
    withLatestFrom(this.store.select(getAppCommonOnlineManual)),
    map(([action, isManual]) => setManualAction({ manual: !isManual }))
  ));

  saveManual$ = createEffect(() => this.actions$.pipe(
    ofType(setManualAction),
    switchMap(action => this.storage.set('isManual', action.manual)),
  ), { dispatch: false });

  ngrxOnInitEffects(): Action {
    return { type: COMMON_EFFECTS_INIT };
  }


}
