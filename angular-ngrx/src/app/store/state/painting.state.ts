import { Painting } from "src/app/api/models";

export interface PaintingState {
  paintings: Painting[];
  selectedPainting: Painting;
  action: string;
  done: boolean;
  error: Error;
}

export const initialPaintingState: PaintingState = {
  paintings: null,
  selectedPainting: null,
  action: null,
  done: false,
  error: null,
};