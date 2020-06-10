/* tslint:disable */
import { Painting } from './painting';
export interface PaintingsResponse {
  errorMessage: string;
  paintings?: Array<Painting>;
  success: boolean;
}
