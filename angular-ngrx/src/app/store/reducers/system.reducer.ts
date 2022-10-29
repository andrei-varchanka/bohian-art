import { createReducer, on } from "@ngrx/store";
import { getCurrentUserAction, setAuthTokenAction, setCurrentUserAction } from "../actions/system.actions";
import { initialSystemState } from "../state/system.state";

export const systemReducer = createReducer(
  initialSystemState,
  on(setCurrentUserAction, (state, payload) => ({...state, currentUser: payload})),
  on(setAuthTokenAction, (state, payload) => ({...state, token: payload.token})),
);