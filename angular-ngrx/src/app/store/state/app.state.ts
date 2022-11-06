import { RouterReducerState } from '@ngrx/router-store';
import { initialPaintingState, PaintingState } from './painting.state';
import { initialSystemState, SystemState } from './system.state';
import { UserState, initialUserState } from './user.state';


export interface AppState {
  router?: RouterReducerState;
  users: UserState;
  paintings: PaintingState;
  system: SystemState;
}

export const initialAppState: AppState = {
  users: initialUserState,
  paintings: initialPaintingState,
  system: initialSystemState
};
