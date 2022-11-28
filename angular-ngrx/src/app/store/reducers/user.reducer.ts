import { createReducer, on } from "@ngrx/store";
import { authAction, authErrorAction, authSuccessAction, changePasswordAction, changePasswordErrorAction, changePasswordSuccessAction, createUserAction, createUserErrorAction, createUserSuccessAction, deleteUserAction, deleteUserErrorAction, deleteUserSuccessAction, getUserAction, getUserErrorAction, getUsersAction, getUsersErrorAction, getUsersSuccessAction, getUserSuccessAction, updateUserAction, updateUserErrorAction, updateUserSuccessAction, UserActions } from "../actions/user.actions";
import { initialUserState } from "../state/user.state";


export const userReducer = createReducer(
  initialUserState,
  on(authAction, (state) => ({...state, action: UserActions.AUTH, done: false, error: null})),
  on(authSuccessAction, (state) => ({...state, done: true})),
  on(authErrorAction, (state, payload) => ({...state, done: true, error: payload.error})),

  on(createUserAction, (state) => ({...state, action: UserActions.CREATE_USER, done: false, error: null})),
  on(createUserSuccessAction, (state, payload) => ({...state, done: true, users: state.users?.concat(payload.user)})),
  on(createUserErrorAction, (state, payload) => ({...state, done: true, error: payload.error})),

  on(getUsersAction, (state) => ({...state, action: UserActions.GET_USERS, done: false, error: null})),
  on(getUsersSuccessAction, (state, payload) => ({ ...state, done: true, users: payload.users })),
  on(getUsersErrorAction, (state, payload) => ({...state, done: true, error: payload.error})),

  on(getUserAction, (state) => ({...state, action: UserActions.GET_USER, done: false, error: null})),
  on(getUserSuccessAction, (state, payload) => ({ ...state, done: true, selectedUser: payload.user })),
  on(getUserErrorAction, (state, payload) => ({...state, done: true, error: payload.error})),

  on(deleteUserAction, (state) => ({...state, action: UserActions.DELETE_USER, done: false, error: null})),
  on(deleteUserSuccessAction, (state, payload) => ({...state, done: true, users: state.users?.filter(u => u.id != payload.userId), selectedUser: null})),
  on(deleteUserErrorAction, (state, payload) => ({...state, done: true, error: payload.error})),
  
  on(updateUserAction, (state, payload) => ({...state, action: UserActions.UPDATE_USER, selectedUser: payload.user, done: false, error: null})),
  on(updateUserSuccessAction, (state, payload) => {
    const index = state.users?.findIndex(user => user.id === state.selectedUser.id);
    return {...state, done: true, users: index && state.users ? [...state.users.slice(0, index), state.selectedUser, ...state.users.slice(index + 1)] : null};
  }),
  on(updateUserErrorAction, (state, payload) => ({...state, done: true, selectedUser: null, error: payload.error})),

  on(changePasswordAction, (state) => ({...state, action: UserActions.CHANGE_PASSWORD, done: false, error: null})),
  on(changePasswordSuccessAction, (state, payload) => ({...state, done: true})),
  on(changePasswordErrorAction, (state, payload) => ({...state, done: true, error: payload.error}))
);