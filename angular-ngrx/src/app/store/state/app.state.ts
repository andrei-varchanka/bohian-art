import { RouterReducerState } from '@ngrx/router-store';
import { initialSystemState, SystemState } from './system.state';
import { UserState, initialUserState } from './user.state';


export interface AppState {
  router?: RouterReducerState;
  users: UserState;
  system: SystemState;
}

export const initialAppState: AppState = {
  users: initialUserState,
  system: initialSystemState
};
