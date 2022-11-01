import { createReducer, on } from "@ngrx/store";
import { setAuthTokenAction, setCurrentUserAction } from "../actions/system.actions";
import { initialSystemState } from "../state/system.state";

export const systemReducer = createReducer(
  initialSystemState,
  on(setCurrentUserAction, (state, payload) => ({...state, currentUser: payload.user})),
  on(setAuthTokenAction, (state, payload) => ({...state, token: payload.token})),
);