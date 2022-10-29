import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { SystemState } from "../state/system.state";

export const selectSystemState = (state: AppState) => state.system;

export const selectCurrentUser = createSelector( selectSystemState, (state: SystemState) => state.currentUser);

export const selectToken = createSelector( selectSystemState, (state: SystemState) => state.token);