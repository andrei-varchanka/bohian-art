import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum SystemActions {
  GetCurrentUser = '[System] Get Current User',
  SetCurrentUser = '[System] Set Current User',
  GetAuthToken = '[System] Get Auth Token',
  SetAuthToken = '[System] Set Auth Token',
}

export const getCurrentUserAction = createAction(SystemActions.GetCurrentUser);
export const setCurrentUserAction = createAction(SystemActions.SetCurrentUser, props<User>());
export const getAuthTokenAction = createAction(SystemActions.GetAuthToken);
export const setAuthTokenAction = createAction(SystemActions.SetAuthToken, props<{token: string}>());
