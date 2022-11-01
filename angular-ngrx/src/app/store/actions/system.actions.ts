import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum SystemActions {
  SetCurrentUser = '[System] Set Current User',
  SetAuthToken = '[System] Set Auth Token',
}

export const setCurrentUserAction = createAction(SystemActions.SetCurrentUser, props<{user: User}>());
export const setAuthTokenAction = createAction(SystemActions.SetAuthToken, props<{token: string}>());
