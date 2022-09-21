import { createAction, props } from "@ngrx/store";
import { AuthUser, User } from "src/app/api/models";

export enum UserActions {
  // Auth = '[Users API] Auth Success',
  GetUsers = '[Users Interface] Get Users',
  GetUsersSuccess = '[Users API] Get Users Success',
  GetUsersError = '[Users API] Get Users Error',
  // CreateUser = '[Users API] Create User Success',
  // GetUser = '[Users API] Get User Success',
  // UpdateUser = '[Users API] Update User Success',
  DeleteUser = '[Users Interface] Delete User',
  DeleteUserSuccess = '[Users API] Delete User Success',
  DeleteUserError = '[Users API] Delete User Error',
  // ChangePassword = '[Users API] Change Password Success'
}

//export const authAction = createAction(UserActions.Auth, props<AuthUser>());

export const getUsersAction = createAction(UserActions.GetUsers);

export const getUsersSuccessAction = createAction(UserActions.GetUsersSuccess, props<{users: User[]}>());

export const getUsersErrorAction = createAction(UserActions.GetUsersError, props<Error>());

// export const createUserAction = createAction(UserActions.CreateUser, props<User>());

// export const getUserAction = createAction(UserActions.GetUser);

// export const updateUserAction = createAction(UserActions.UpdateUser, props<User>());

export const deleteUserAction = createAction(UserActions.DeleteUser, props<{userId: string}>());

export const deleteUserSuccessAction = createAction(UserActions.DeleteUserSuccess, props<{userId: string}>());

export const deleteUserErrorAction = createAction(UserActions.DeleteUserError, props<Error>());

// export const changePasswordAction = createAction(UserActions.ChangePassword, props<{password: string}>());
