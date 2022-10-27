import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum UserActions {
  Auth = '[User Interface] Authorize',
  AuthSuccess = '[Users API] Auth Success',
  AuthError = '[Users API] Auth Error',

  GetUsers = '[Users Interface] Get Users',
  GetUsersSuccess = '[Users API] Get Users Success',
  GetUsersError = '[Users API] Get Users Error',

  // CreateUser = '[Users API] Create User Success',

  GetUser = '[Users Interface] Get User',
  GetUserSuccess = '[Users API] Get User Success',
  GetUserError = '[Users API] Get User Error',

  UpdateUser = '[User Interface] Update User',
  UpdateUserSuccess = '[Users API] Update User Success',
  UpdateUserError = '[Users API] Update User Error',

  DeleteUser = '[Users Interface] Delete User',
  DeleteUserSuccess = '[Users API] Delete User Success',
  DeleteUserError = '[Users API] Delete User Error',

  ChangePassword = '[User Interface] Change Password',
  ChangePasswordSuccess = '[Users API] Change Password Success',
  ChangePasswordError = '[Users API] Change Password Error'
}

export const authAction = createAction(UserActions.Auth, props<AuthUser>());
export const authSuccessAction = createAction(UserActions.AuthSuccess, props<{token: string, user: User}>());
export const authErrorAction = createAction(UserActions.AuthError, props<Error>());

export const getUsersAction = createAction(UserActions.GetUsers);
export const getUsersSuccessAction = createAction(UserActions.GetUsersSuccess, props<{users: User[]}>());
export const getUsersErrorAction = createAction(UserActions.GetUsersError, props<Error>());

// export const createUserAction = createAction(UserActions.CreateUser, props<User>());

export const getUserAction = createAction(UserActions.GetUser, props<{userId: string}>());
export const getUserSuccessAction = createAction(UserActions.GetUserSuccess, props<User>());
export const getUserErrorAction = createAction(UserActions.GetUserError, props<Error>());

export const updateUserAction = createAction(UserActions.UpdateUser, props<User>());
export const updateUserSuccessAction = createAction(UserActions.UpdateUserSuccess, props<User>());
export const updateUserErrorAction = createAction(UserActions.UpdateUserError, props<Error>());

export const deleteUserAction = createAction(UserActions.DeleteUser, props<{userId: string}>());
export const deleteUserSuccessAction = createAction(UserActions.DeleteUserSuccess, props<{userId: string}>());
export const deleteUserErrorAction = createAction(UserActions.DeleteUserError, props<Error>());

export const changePasswordAction = createAction(UserActions.ChangePassword, props<{userId: string, password: string}>());
export const changePasswordSuccessAction = createAction(UserActions.ChangePasswordSuccess, props<User>());
export const changePasswoedErrorAction = createAction(UserActions.ChangePasswordError, props<Error>());
