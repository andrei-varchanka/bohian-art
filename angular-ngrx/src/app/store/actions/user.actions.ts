import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum UserActions {
  AUTH = '[User Interface] Authorize',
  AUTH_SUCCESS = '[Users API] Auth Success',
  AUTH_ERROR = '[Users API] Auth Error',

  CREATE_USER = '[Registration Interface] Create User',
  CREATE_USER_SUCCESS = '[Users API] Create User Success',
  CREATE_USER_ERROR = '[Users API] Create User Error',

  GET_USERS = '[Users Interface] Get Users',
  GET_USERS_SUCCESS = '[Users API] Get Users Success',
  GET_USERS_ERROR = '[Users API] Get Users Error',

  GET_USER = '[Users Interface] Get User',
  GET_USER_SUCCESS = '[Users API] Get User Success',
  GET_USER_ERROR = '[Users API] Get User Error',

  UPDATE_USER = '[User Interface] Update User',
  UPDATE_USER_SUCCESS = '[Users API] Update User Success',
  UPDATE_USER_ERROR = '[Users API] Update User Error',

  DELETE_USER = '[Users Interface] Delete User',
  DELETE_USER_SUCCESS = '[Users API] Delete User Success',
  DELETE_USER_ERROR = '[Users API] Delete User Error',

  CHANGE_PASSWORD = '[User Interface] Change Password',
  CHANGE_PASSWORD_SUCCESS = '[Users API] Change Password Success',
  CHANGE_PASSWORD_ERROR = '[Users API] Change Password Error'
}

export const authAction = createAction(UserActions.AUTH, props<{ email: string, password: string }>());
export const authSuccessAction = createAction(UserActions.AUTH_SUCCESS, props<{ token: string, user: User }>());
export const authErrorAction = createAction(UserActions.AUTH_ERROR, props<{ error: Error }>());

export const createUserAction = createAction(UserActions.CREATE_USER, props<{ user: User }>());
export const createUserSuccessAction = createAction(UserActions.CREATE_USER_SUCCESS, props<{ token: string, user: User }>());
export const createUserErrorAction = createAction(UserActions.CREATE_USER_ERROR, props<{ error: Error }>());

export const getUsersAction = createAction(UserActions.GET_USERS);
export const getUsersSuccessAction = createAction(UserActions.GET_USERS_SUCCESS, props<{ users: User[] }>());
export const getUsersErrorAction = createAction(UserActions.GET_USERS_ERROR, props<{ error: Error }>());

export const getUserAction = createAction(UserActions.GET_USER, props<{ userId: string }>());
export const getUserSuccessAction = createAction(UserActions.GET_USER_SUCCESS, props<{ user: User }>());
export const getUserErrorAction = createAction(UserActions.GET_USER_ERROR, props<{ error: Error }>());

export const updateUserAction = createAction(UserActions.UPDATE_USER, props<{ user: User }>());
export const updateUserSuccessAction = createAction(UserActions.UPDATE_USER_SUCCESS, props<{ user: User }>());
export const updateUserErrorAction = createAction(UserActions.UPDATE_USER_ERROR, props<{ error: Error }>());

export const deleteUserAction = createAction(UserActions.DELETE_USER, props<{ userId: string }>());
export const deleteUserSuccessAction = createAction(UserActions.DELETE_USER_SUCCESS, props<{ userId: string }>());
export const deleteUserErrorAction = createAction(UserActions.DELETE_USER_ERROR, props<{ error: Error }>());

export const changePasswordAction = createAction(UserActions.CHANGE_PASSWORD, props<{ userId: string, password: string }>());
export const changePasswordSuccessAction = createAction(UserActions.CHANGE_PASSWORD_SUCCESS, props<{ user: User }>());
export const changePasswordErrorAction = createAction(UserActions.CHANGE_PASSWORD_ERROR, props<{ error: Error }>());
