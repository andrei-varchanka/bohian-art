/* tslint:disable */
import { Painting } from './painting';
export interface PaintingsResponse {
  count?: number;
  currentPage?: number;
  errorMessage: string;
  paintings: Array<Painting>;
  success: boolean;
  totalPages?: number;
}
