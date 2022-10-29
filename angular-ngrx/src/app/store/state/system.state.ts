import { User } from "src/app/api/models";

export interface SystemState {
  currentUser: User;
  token: string;
}

export const initialSystemState: SystemState = {
  currentUser: null,
  token: null
};