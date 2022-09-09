/* tslint:disable */
import { User } from './user';
export interface AuthUserResponse {
  errorMessage: string;
  success: boolean;
  token: string;
  user: User;
}
