import { createReducer, on } from "@ngrx/store";
import { getUsersAction } from "../actions/user.actions";
import { initialUserState } from "../state/user.state";


export const userReducer = createReducer(
  initialUserState,
  on(getUsersAction, (state, payload) => ({ ...state, users: payload.users })),
  // on(addBook, (state, { bookId }) => {
  //   if (state.indexOf(bookId) > -1) return state;

  //   return [...state, bookId];
  // })
);