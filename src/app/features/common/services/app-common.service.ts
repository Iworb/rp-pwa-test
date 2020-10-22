import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AppCommonState,
  getAppCommonOnlineManual,
  getAppCommonOnlineStatus,
  setManualAction,
  toggleManualAction
} from '../store';

@Injectable()
export class AppCommonService {
  constructor(
    private store: Store<AppCommonState>
  ) {
  }

  get isOnline$(): Observable<boolean> {
    return this.store.select(getAppCommonOnlineStatus);
  }

  get isManual$(): Observable<boolean> {
    return this.store.select(getAppCommonOnlineManual);
  }

  setManual(manual: boolean): void {
    this.store.dispatch(setManualAction({ manual }));
  }

  toggleManual(): void {
    this.store.dispatch(toggleManualAction());
  }

}
