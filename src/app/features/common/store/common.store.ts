import { Action, createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export class AppCommonState {
  isOnline: boolean;
  isManual: boolean;
}

export const appCommonStateInitial: AppCommonState = {
  isOnline: false,
  isManual: false
};

// ACTIONS

export enum AppCommonActionTypes {
  SetOnlineStatus = '[ONLINE] Set online status',
  SetManual = '[ONLINE] Set manual',
  ToggleManual = '[ONLINE] Toggle manual',
}

export const setOnlineStatusAction = createAction(AppCommonActionTypes.SetOnlineStatus, props<{ status: boolean }>());
export const setManualAction = createAction(AppCommonActionTypes.SetManual, props<{ manual: boolean }>());
export const toggleManualAction = createAction(AppCommonActionTypes.ToggleManual);

// SELECTORS

export const getAppCommonStoreState = createFeatureSelector<AppCommonState>('common');

export const getAppCommonOnlineManual = createSelector(getAppCommonStoreState, (state) => state.isManual);
export const getAppCommonOnlineStatus = createSelector(getAppCommonStoreState, (state) => state.isOnline);

// REDUCER

export const appCommonReducerFn = createReducer<AppCommonState>(
  appCommonStateInitial,
  on(setOnlineStatusAction, (state, {status}) => ({isOnline: status, isManual: false})),
  on(setManualAction, (state, {manual}) => ({isOnline: false, isManual: manual})),
);

export function appCommonReducer(state: AppCommonState | undefined, action: Action): AppCommonState {
  return appCommonReducerFn(state, action);
}

