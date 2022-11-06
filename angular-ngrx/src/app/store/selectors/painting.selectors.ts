import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PaintingState } from '../state/painting.state';

const selectPaintingsFromState = (state: AppState) => state.paintings;

export const selectPaintings = createSelector( selectPaintingsFromState, (state: PaintingState) => state.paintings);

export const selectSelectedPainting = createSelector( selectPaintingsFromState, (state: PaintingState) => state.selectedPainting);
