import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum UserActions {
  Auth = '[Users API] Auth Success',
  GetUsers = '[Users API] Get Users Success',
  CreateUser = '[Users API] Create User Success',
  GetUser = '[Users API] Get User Success',
  UpdateUser = '[Users API] Update User Success',
  DeleteUser = '[Users API] Delete User Success',
  ChangePassword = '[Users API] Change Password Success'
}

export const authAction = createAction(UserActions.Auth, props<AuthUser>());

export const getUsersAction = createAction(UserActions.GetUsers, props<{users: User[]}>());

export const createUserAction = createAction(UserActions.CreateUser, props<User>());

export const getUserAction = createAction(UserActions.GetUser);

export const updateUserAction = createAction(UserActions.UpdateUser, props<User>());

export const deleteUserAction = createAction(UserActions.DeleteUser);

export const changePasswordAction = createAction(UserActions.ChangePassword, props<{password: string}>());
