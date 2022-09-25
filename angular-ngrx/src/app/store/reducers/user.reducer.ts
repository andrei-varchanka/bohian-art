import { createReducer, on } from "@ngrx/store";
import { deleteUserAction, deleteUserErrorAction, deleteUserSuccessAction, getUserAction, getUserErrorAction, getUsersAction, getUsersErrorAction, getUsersSuccessAction, getUserSuccessAction, UserActions } from "../actions/user.actions";
import { initialUserState } from "../state/user.state";


export const userReducer = createReducer(
  initialUserState,
  on(getUsersAction, (state) => ({...state, action: UserActions.GetUsers, done: false, error: null})),
  on(getUsersSuccessAction, (state, payload) => ({ ...state, done: true, users: payload.users })),
  on(getUsersErrorAction, (state, payload) => ({...state, error: payload})),

  on(getUserAction, (state) => ({...state, action: UserActions.GetUser, done: false, error: null})),
  on(getUserSuccessAction, (state, payload) => ({ ...state, done: true, selectedUser: payload })),
  on(getUserErrorAction, (state, payload) => ({...state, error: payload})),

  on(deleteUserAction, (state) => ({...state, action: UserActions.DeleteUser, done: false, error: null})),
  on(deleteUserSuccessAction, (state, payload) => ({...state, done: true, users: state.users.filter(u => u.id != payload.userId)})),
  on(deleteUserErrorAction, (state, payload) => ({...state, error: payload}))
);