import { createReducer, on } from "@ngrx/store";
import { deleteUserErrorAction, deleteUserSuccessAction, getUsersSuccessAction } from "../actions/user.actions";
import { initialUserState } from "../state/user.state";


export const userReducer = createReducer(
  initialUserState,
  on(getUsersSuccessAction, (state, payload) => ({ ...state, users: payload.users })),
  on(deleteUserSuccessAction, (state, payload) => ({...state, users: state.users.filter(u => u.id != payload.userId)})),
  on(deleteUserErrorAction, (state, payload) => ({...state, error: payload}))
  // on(addBook, (state, { bookId }) => {
  //   if (state.indexOf(bookId) > -1) return state;

  //   return [...state, bookId];
  // })
);