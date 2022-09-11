import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';

const selectUsersFromState = (state: AppState) => state.users;

export const selectUsers = createSelector( selectUsersFromState, (state: UserState) => state.users);

// export const selectSelectedUser = createSelector( selectUsersFromState,(state: UserState) => state.selectedUser);
