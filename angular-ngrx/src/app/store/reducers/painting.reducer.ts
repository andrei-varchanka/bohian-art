import { createReducer, on } from "@ngrx/store";
import { getPaintingsAction, getPaintingsErrorAction, getPaintingsSuccessAction, PaintingActions } from "../actions/painting.actions";
import { initialPaintingState } from "../state/painting.state";

export const paintingReducer = createReducer(
  initialPaintingState,
  on(getPaintingsAction, (state) => ({ ...state, action: PaintingActions.GetPaintings, done: false, error: null })),
  on(getPaintingsSuccessAction, (state, payload) => ({ ...state, done: true, paintings: payload.paintings })),
  on(getPaintingsErrorAction, (state, payload) => ({ ...state, done: true, error: payload })),
);