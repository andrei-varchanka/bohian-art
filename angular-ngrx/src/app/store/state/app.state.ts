import { RouterReducerState } from '@ngrx/router-store';

import { UserState, initialUserState } from './user.state';


export interface AppState {
  router?: RouterReducerState;
  users: UserState;
}

export const initialAppState: AppState = {
  users: initialUserState,
};
