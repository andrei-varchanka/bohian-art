/* tslint:disable */
import { User } from './user';
export interface UserResponse {
  errorMessage: string;
  success: boolean;
  user: User;
}
