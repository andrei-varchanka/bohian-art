import { User } from "src/app/api/models";

export interface UserState {
  users: User[];
  selectedUser: User;
  action: string;
  done: boolean;
  error: Error;
}

export const initialUserState: UserState = {
  users: null,
  selectedUser: null,
  action: null,
  done: false,
  error: null,
};