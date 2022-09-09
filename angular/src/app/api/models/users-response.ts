/* tslint:disable */
import { User } from './user';
export interface UsersResponse {
  errorMessage: string;
  success: boolean;
  users: Array<User>;
}
