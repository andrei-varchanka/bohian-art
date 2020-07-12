/* tslint:disable */
import { Painting } from './painting';
export interface PaintingsResponse {
  currentPage?: number;
  errorMessage: string;
  paintings?: Array<Painting>;
  success: boolean;
  totalPages?: number;
}
