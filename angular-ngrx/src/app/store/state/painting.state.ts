import { Painting, PaintingsParametersResponse } from "src/app/api/models";

export interface PaintingState {
  paintings: Painting[];
  count: number;
  parameters: PaintingsParametersResponse;
  selectedPainting: Painting;
  action: string;
  done: boolean;
  error: Error;
}

export const initialPaintingState: PaintingState = {
  paintings: null,
  count: null,
  parameters: null,
  selectedPainting: null,
  action: null,
  done: false,
  error: null,
};