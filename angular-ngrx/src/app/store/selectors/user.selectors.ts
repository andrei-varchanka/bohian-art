import { createSelector } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';

const selectUsersFromState = (state: AppState) => state.users;

export const selectUsers = createSelector( selectUsersFromState, (state: UserState) => state.users);

export const selectSelectedUser = createSelector( selectUsersFromState, (state: UserState) => {
  if (state.action === UserActions.GetUser && state.done) {
    return state.selectedUser;
  } else {
    return null;
  }
});
