import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum SystemActions {
  SET_CURRENT_USER = '[System] Set Current User',
  SET_AUTH_TOKEN = '[System] Set Auth Token',
}

export const setCurrentUserAction = createAction(SystemActions.SET_CURRENT_USER, props<{ user: User }>());
export const setAuthTokenAction = createAction(SystemActions.SET_AUTH_TOKEN, props<{ token: string }>());
