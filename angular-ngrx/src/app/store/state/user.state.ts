import { User } from "src/app/api/models";

export interface UserState {
  users: User[];
  error: Error;
  // selectedUser: User;
}

export const initialUserState: UserState = {
  users: null,
  error: null
  // selectedUser: null
};