import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { AppState } from '../state/app.state';
import { userReducer } from './user.reducer';
import { systemReducer } from './system.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  users: userReducer,
  system: systemReducer
};